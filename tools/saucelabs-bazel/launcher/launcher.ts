import {createConnection, Socket} from 'net';
import {Browser, getUniqueId} from '../browser';
import {BackgroundServiceSendMessages, EndTestMessage, StartTestMessage} from '../ipc-messages';

export function SaucelabsLauncher(this: any,
                                  args: Browser,
                                  config: unknown,
                                  logger: any,
                                  baseLauncherDecorator: any,
                                  captureTimeoutLauncherDecorator: any,
                                  retryLauncherDecorator: any) {

  // Apply base class mixins. This would be nice to have typed, but this is a low-priority now.
  baseLauncherDecorator(this);
  captureTimeoutLauncherDecorator(this);
  retryLauncherDecorator(this);

  const log = logger.create('SaucelabsLauncher');
  const browserDisplayName = args.browserName +
    (args.browserVersion ? ' ' + args.browserVersion : '') +
    (args.platformName ? ' (' + args.platformName + ')' : '');

  let daemonConnection: Socket|null = null;

  // Setup Browser name that will be printed out by Karma.
  this.name = browserDisplayName + ' on SauceLabs (daemon)';

  this.on('start', (pageUrl: string) => {
    daemonConnection = createConnection({port: 5324},
        () => _startBrowserTest(pageUrl, args));

    daemonConnection.on('data', b => _processMessage(JSON.parse(b.toString())));
    daemonConnection.on('error', err => {
      log.error(err);

      // Notify karma about the failure.
      this._done('failure');
    });
  });

  this.on('kill', async (doneFn: () => void) => {
    _endBrowserTest();
    daemonConnection!.end();
    doneFn();
  });

  const _processMessage = (message: BackgroundServiceSendMessages) => {
    switch (message.type) {
      case 'browser-not-ready':
        log.error(
          'Browser %s is not ready in the Saucelabs background service.', browserDisplayName);
        this._done('failure');
    }
  };

  const _startBrowserTest = (pageUrl: string, browser: Browser) => {
    log.info('Starting browser %s test in daemon with URL: %s', browserDisplayName, pageUrl);
    daemonConnection!.write(JSON.stringify(
        new StartTestMessage(pageUrl, getUniqueId(browser))));
  };

  const _endBrowserTest = () => {
    log.info('Test for browser %s completed', browserDisplayName);
    daemonConnection!.write(JSON.stringify(new EndTestMessage()));
  };
}

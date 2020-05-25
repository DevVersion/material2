import {createServer, Server, Socket} from 'net';
import {BackgroundServiceReceiveMessages, NoAvailableBrowserMessage} from '../ipc-messages';
import {SaucelabsDaemon} from './saucelabs-daemon';

let nextSocketId = 0;

export class IpcServer {
  private readonly _server: Server;
  private _connections = new Map<number, Socket>();

  constructor(private _service: SaucelabsDaemon, port = 5324) {
    this._server = createServer(this._connectionHandler.bind(this));
    this._server.listen(port, () => console.info('Daemon IPC server listening.'));
  }

  private _connectionHandler(socket: Socket) {
    const socketId = nextSocketId++;
    this._connections.set(socketId, socket);
    socket.on('data', b => this._processMessage(socket, socketId, JSON.parse(b.toString())));
  }

  private _processMessage(
      socket: Socket, socketId: number, message: BackgroundServiceReceiveMessages) {
    switch (message.type) {
      case 'start-test':
        console.debug(`Starting tests for ${socketId}`);
        if (!this._service.startTest(
                {testId: socketId, pageUrl: message.url, requestedBrowserId: message.browserId})) {
          this._noAvailableBrowser(socket);
        }
        break;
      case 'end-test':
        console.debug(`Ending tests for ${socketId}`);
        this._service.endTest(socketId);
        break;
    }
  }

  private _noAvailableBrowser(socket: Socket) {
    socket.write(JSON.stringify(new NoAvailableBrowserMessage()));
  }
}

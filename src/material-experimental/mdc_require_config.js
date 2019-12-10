// Require.js is being used by the karma bazel rules and needs to be configured to properly
// load AMD modules which are not explicitly named in their output bundle.
require.config({
  paths: {
    '@material/animation': '/base/npm/node_modules/@material/animation/dist/mdc.animation',
    '@material/auto-init': '/base/npm/node_modules/@material/auto-init/dist/mdc.autoInit',
    '@material/base': '/base/npm/node_modules/@material/base/dist/mdc.base',
    '@material/checkbox': '/base/npm/node_modules/@material/checkbox/dist/mdc.checkbox',
    '@material/chips': '/base/npm/node_modules/@material/chips/dist/mdc.chips',
    '@material/dialog': '/base/npm/node_modules/@material/dialog/dist/mdc.dialog',
    '@material/dom': '/base/npm/node_modules/@material/dom/dist/mdc.dom',
    '@material/drawer': '/base/npm/node_modules/@material/drawer/dist/mdc.drawer',
    '@material/floating-label': '/base/npm/node_modules/@material/floating-label/dist/mdc.floatingLabel',
    '@material/form-field': '/base/npm/node_modules/@material/form-field/dist/mdc.formField',
    '@material/grid-list': '/base/npm/node_modules/@material/grid-list/dist/mdc.gridList',
    '@material/icon-button': '/base/npm/node_modules/@material/icon-button/dist/mdc.iconButton',
    '@material/line-ripple': '/base/npm/node_modules/@material/line-ripple/dist/mdc.lineRipple',
    '@material/linear-progress': '/base/npm/node_modules/@material/linear-progress/dist/mdc.linearProgress',
    '@material/list': '/base/npm/node_modules/@material/list/dist/mdc.list',
    '@material/menu': '/base/npm/node_modules/@material/menu/dist/mdc.menu',
    '@material/menu-surface': '/base/npm/node_modules/@material/menu-surface/dist/mdc.menuSurface',
    '@material/notched-outline': '/base/npm/node_modules/@material/notched-outline/dist/mdc.notchedOutline',
    '@material/radio': '/base/npm/node_modules/@material/radio/dist/mdc.radio',
    '@material/ripple': '/base/npm/node_modules/@material/ripple/dist/mdc.ripple',
    '@material/select': '/base/npm/node_modules/@material/select/dist/mdc.select',
    '@material/slider': '/base/npm/node_modules/@material/slider/dist/mdc.slider',
    '@material/snackbar': '/base/npm/node_modules/@material/snackbar/dist/mdc.snackbar',
    '@material/switch': '/base/npm/node_modules/@material/switch/dist/mdc.switch',
    '@material/tab': '/base/npm/node_modules/@material/tab/dist/mdc.tab',
    '@material/tab-bar': '/base/npm/node_modules/@material/tab-bar/dist/mdc.tabBar',
    '@material/tab-indicator': '/base/npm/node_modules/@material/tab-indicator/dist/mdc.tabIndicator',
    '@material/tab-scroller': '/base/npm/node_modules/@material/tab-scroller/dist/mdc.tabScroller',
    '@material/data-table': '/base/npm/node_modules/@material/data-table/dist/mdc.dataTable',
    '@material/text-field': '/base/npm/node_modules/@material/textfield/dist/mdc.textfield',
    '@material/top-app-bar': '/base/npm/node_modules/@material/top-app-bar/dist/mdc.topAppBar',
  }
});

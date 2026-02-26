import { afterTest, onComplete, onPrepare } from './hooks'

export const wdioConfigCommon: WebdriverIO.Config = {
  runner: 'local',
  services: [
    ['appium', { args: { address: '127.0.0.1', port: 4723 }, command: 'appium' }],
  ],
  specs: ['./src/specs/**/*.e2e.ts'],
  maxInstances: 1,

  logLevel: 'info',
  logLevels: {
    webdriver: 'warn',
    e2e: 'debug',
  },

  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 5 * 60 * 1000, // 5 min
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  reporters: [['spec', { showPreface: false }]],

  onPrepare,
  onComplete,
  afterTest,

  capabilities: [],
}

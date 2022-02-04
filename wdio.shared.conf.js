import RpService from 'wdio-reportportal-service';
import dotenv from 'dotenv';
import reportportal from 'wdio-reportportal-reporter';
import video from 'wdio-video-reporter';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetApp(test, context) {
  // eslint-disable-next-line no-undef
  browser.reset();
}

const reportPortalConf = {
  reportPortalClientConfig: {
    token: process.env.reportPortalClientConfigToken,
    endpoint: process.env.reportPortalClientConfigEndpoint,
    launch: 'e2eTests',
    project: process.env.reportPortalClientConfigProject,
    mode: 'DEFAULT',
    debug: false,
    description: 'EScooterapp Tests',
  },
  autoAttachScreenshots: true,
  screenshotsLogLevel: 'debug',
  reportSeleniumCommands: true,
  seleniumCommandsLogLevel: 'trace',
};
const videoReporter = [
  video,
  {
    saveAllVideos: false,
    videoSlowdownMultiplier: 10,
    outputDir: 'testlogs/',
    videoRenderTimeout: 10,
  },
];
const reporters = process.env.reportPortalClientConfigToken
  ? [videoReporter, [reportportal, reportPortalConf]]
  : [videoReporter];
export const config = {
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    timeout: 600000,
    retries: process.env.autoTestMochaRetries || 0,
    require: ['@babel/register'],
  },
  sync: true,
  logLevel: 'debug',
  deprecationWarnings: true,
  bail: 0,
  baseUrl: '',
  waitforTimeout: 20000,
  connectionRetryTimeout: 240000,
  connectionRetryCount: 3,
  outputDir: 'testlogs/',
  beforeTest: resetApp,
  reporters: reporters,
  specs: ['./tests/e2e/specs/**/*.ts'],
  services: [
    [RpService, {}],
    [
      'appium',
      {
        logPath: 'testlogs/',
      },
    ],
  ],
  hostname: '0.0.0.0',
  port: 4723,
};

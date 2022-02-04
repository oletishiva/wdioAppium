import { config } from './wdio.shared.conf';
import { join } from 'path';
import { readdirSync } from 'fs';

const getApp = (platform, fileExtension) => {
  const buildDir = `fastlane/builds/${platform}`;
  const files = readdirSync(buildDir);
  const appName = files.filter((file) => file.endsWith(`.${fileExtension}`) === true)[0];
  if (!appName) {
    throw Error(`Application binary (APK | IPA) is not present in : ${buildDir}`);
  }
  const appNameWithPath = join(buildDir, appName);
  return appNameWithPath;
};

config.capabilities = [
  {
    platformName: 'Android',
    deviceName: 'Mi A3',
    app: getApp('android', 'apk'),
    appPackage: 'com.escooterapp.debug',
    appActivity: 'com.escooterapp.MainActivity',
    autoAcceptAlerts: true,
    maxInstances: 1,
    noReset: true,
    autoGrantPermissions: true,
    newCommandTimeout: 240,
    uiautomator2ServerInstallTimeout: 240000,
    uiautomator2ServerLaunchTimeout: 240000,
    adbExecTimeout: 240000,
    androidInstallTimeout: 240000,
    ignoreHiddenApiPolicyError: true,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 3,
    gpsEnabled: true,
    buildToolsVersion: '29.0.3',
    disableWindowAnimation: true,
    mockLocationApp: 'io.appium.settings',
    excludeDriverLogs: ['bugreport', 'server'],
  },
];

exports.config = config;

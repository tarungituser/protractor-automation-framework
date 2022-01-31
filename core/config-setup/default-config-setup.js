const browserList = require('./browser-list.js');
const setupUtilities = require('./setup-utilities');

const browserStackBrowser = browserList[setupUtilities.getParam('chrome', '--params.browserstack.browser', false)];
const maxBrowserInstances = process.env.MAX_INSTANCES || setupUtilities.getParam(5, '--params.maxInstances', false);
const useHeadlessBrowser = process.env.HEADLESS_BROWSER || setupUtilities.toBoolean(setupUtilities.getParam(false, '--params.headlessBrowser', false));
const numberOfRetries = process.env.NUMBER_OF_RETRIES || (setupUtilities.getParam(3, '--params.numberOfRetries', false));
const softAssertions = process.env.SOFT_ASSERTIONS || (setupUtilities.getParam(false, '--params.softAssertions', false));
const chromeHeadlessArgs =
    ['--headless',
      '--disable-gpu',
      '--window-size=1280x800',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--acceptInsecureCerts',
      '--ignore-certificate-errors',
      '--remote-debugging-port=9222',
      '--disable-blink-features=BlockCredentialedSubresources',
      '--disable-web-security'];

const chromeOptions = {
  args: useHeadlessBrowser ? chromeHeadlessArgs : [],
  prefs: {
    download: {
      prompt_for_download: false,
      directory_upgrade: true,
      default_directory: 'Downloads',
    },
  },
};
const configSetup = {
  restartBrowserBetweenTests: false,
  SELENIUM_PROMISE_MANAGER: false,
  multiCapabilities: [{
    browserName: 'chrome',
    chromeOptions,
    shardTestFiles: 'true',
    maxInstances: maxBrowserInstances,
    acceptInsecureCerts: true,
  }],
  allScriptsTimeout: 300000,
  suites: {
    // api: './e2e/test-suites/api/roles/roles.e2e-spec.js'
    e2e: './e2e/test-suites/health-check/login/globalization.e2e-spec.js',
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions,
    acceptInsecureCerts: true,
  },
  bsMultiCapabilities: [{
    name: `${browserStackBrowser.os} ${browserStackBrowser.os_version}-${browserStackBrowser.browserName} v ${browserStackBrowser.browser_version || 'Latest'}`,
    browserName: browserStackBrowser.browserName,
    browser_version: browserStackBrowser.browser_version,
    os: browserStackBrowser.os,
    os_version: browserStackBrowser.os_version,
    resolution: browserStackBrowser.resolution,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || setupUtilities.getParam('', '--params.browserstack.user', false),
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || setupUtilities.getParam('', '--params.browserstack.key', false),
    'browserstack.local': process.env.BROWSERSTACK_LOCAL || setupUtilities.getParam(false, '--params.browserstack.local', false),
    build: process.env.BROWSERSTACK_BUILD || setupUtilities.getParam(`Local Build - ${new Date().toISOString()}`, '--params.browserstack.build', false),
    'browserstack.debug': 'true',
    acceptSslCerts: 'true',
    trustAllSSLCertificates: 'true',
    'browserstack.timezone': 'UTC',
    'browserstack.safari.allowAllCookies': 'true',
    shardTestFiles: true,
    maxInstances: maxBrowserInstances,
  }],
  params: {
    numberOfRetries,
    verboseLogging: process.env.ENABLE_VERBOSE_LOGGING || setupUtilities.getParam(false, '--params.enableVerboseLogging', false),
    maxInstances: 5,
    maxSessions: 5,
    api: {
      login: 'v2/tarun',
    },
    users: {
      administrator: {
        username: 'admin',
        password: 'admin',
        displayName: 'AP Administrator',
      },
    },
    softAssertions,
    testrail: {
      projectId: process.env.TESTRAIL_PROJECT_ID || setupUtilities.getParam(332, '--params.testrail.projectId', false),
      milestoneName: process.env.TESTRAIL_MILESTONE_NAME || setupUtilities.getParam('Automation milestone week', '--params.testrail.milestoneName', false),
      versionName: process.env.VERSION || setupUtilities.getParam('Default version name', '--params.testrail.versionName', false),
      host: process.env.TESTRAIL_HOST || setupUtilities.getParam('', '--params.testrail.host', false),
      user: process.env.TESTRAIL_USER || setupUtilities.getParam('', '--params.testrail.user', false),
      password: process.env.TESTRAIL_PASSWORD || setupUtilities.getParam('', '--params.testrail.password', false),
    },
    version: process.env.VERSION || setupUtilities.getParam('7.5.0', '--params.testrail.versionName', false),
    selenium: {
      hub: process.env.SELENIUM_URL || setupUtilities.getParam('http://10.69.8.112:4444/wd/hub', '--params.selenium.hub', false),
    },
    language: process.env.LANGUAGE || setupUtilities.getParam('French', '--params.language', false),
    browserstack: {
      user: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      key: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      local: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      localIdentifier: '', // Don't specify anything here it's just for a reference purpose that it can be a param
      build: '', // Don't specify anything here it's just for a reference purpose that it can be a param
    },

  },
  baseUrl: 'https://www.monotype.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print() {
    },
  },
};
module.exports = configSetup;

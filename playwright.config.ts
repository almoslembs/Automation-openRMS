import {PlaywrightTestConfig, devices} from '@playwright/test';
import 'dotenv/config';

interface TestConfig extends PlaywrightTestConfig {
  // baseUrl: string;
  // endpoint: string;
  timeout?: number;
  expect?: { timeout?: number };
}



const defaultConfig: PlaywrightTestConfig = {
  testDir: './tests/specs',

  /* Maximum time one test can run for. */
  timeout: 60 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30 * 1000, // 10 detik
  },
  maxFailures: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Set quiet mode to reduce output verbosity based on the environment */
  quiet: !!process.env.CI,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    // ['dot'],
    // ['line'],
    ['html', {outputFolder: 'reports/html', open: 'always'}],
    ['allure-playwright', {outputFolder: 'reports/allure'}],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'on',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    launchOptions: {
      // headless: process.env.ENV !== 'dev',
      args: ['--start-maximized'],
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: '',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* chrome is highly reommended for NMS project */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chromium',
        viewport: null,
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'reports/artifacts/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

// dev
const devConfig: TestConfig = {
  timeout: 60 * 200,
  expect: { timeout: 30 * 100000 },
};



// config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(
      devConfig),
};
export default config;

import {test as base, BrowserContext, Page} from '@playwright/test';
import {Login} from 'tests/pageObjects/Login/login.page';
import dotenv from 'dotenv';
import {OpenMRS} from 'tests/pageObjects/OpenMRS/openMRS.page';
import {RegisterPatient} from 'tests/pageObjects/OpenMRS/registerPatient.page';
import {VisionPatient} from 'tests/pageObjects/OpenMRS/visionPatient.page';
dotenv.config();

let browserContext: BrowserContext;
let page: Page;
let pageLogin: Login;
let mrs: OpenMRS;
let patient: RegisterPatient;
let vision: VisionPatient;

type StepFn = (title: string, fn: () => unknown, fullPage?: boolean) => unknown;

// Extend the test with the new functionality
const test = base.extend<{ step: StepFn }>({
  // eslint-disable-next-line no-empty-pattern
  step: async ({}, use, testInfo) => {
    await use(async (title, fn, fullPage = false) => {
      await test.step(title, async () => {
        try {
          await fn();
        } finally {
          await testInfo.attach(`screenshot after step "${title}"`, {
            body: await page.screenshot({fullPage}), // Conditional screenshot
            contentType: 'image/png',
          });
        }
      });
    });
  },
});

// maintain session untuk browser
test.beforeAll(async ({browser}) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
  pageLogin = new Login(page);
  mrs = new OpenMRS(page);
  patient = new RegisterPatient(page);
  vision = new VisionPatient(page);
});

test.afterAll(async () => {
  await browserContext.close();
});
test('As an Admin, I unable to login with invalid password', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('admin', 'Invalid123');
});
test('As an Admin, I unable to login with invalid username', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('invalid', 'Admin123');
});
test('As an Admin, I unable to login with blank password', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('admin', '');
});
test('As an Admin, I unable to login with blank username', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('', 'Admin123');
});
test('As an Admin, I unable to login with invalid username and password', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('invalid', 'Invalid123');
});
test('As an Admin, I unable to login with blank username and password', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('', '');
});
test('As an Admin, I am able to login with valid username and password', async () => {
  await pageLogin.openMRS();
  await pageLogin.validateLoginPage();
  await pageLogin.loginAdminValidate('admin', 'Admin123');
  await mrs.validateOpenMRS();
});
test('As an Admin, I am able to "Register a patient"', async () => {
  await mrs.registerAPatient();
  await patient.inputGivenNamePatient('Almos');
  await patient.inputFamilyNamePatient('BS');
  await patient.inputGenderPatient('M');
  await patient.inputDayPatient('22');
  await patient.inputMonthPatient('October');
  await patient.inputYearPatient('1999');
  await patient.inputAddressPatient('JL Ada JLN');
  await patient.clickNext();
  await patient.inputPhonePatient('');
  await patient.clickNext();
  await patient.inputRelativePatient('');
  await patient.clickNext();
  await patient.clickConfirm();
});

test('As an Admin, I am able to "Start Visit" with existing patient', async () => {
  test.setTimeout(30000); // Ubah jadi 30 detik
  await vision.clickStartVision();
  await vision.clickConfirmStartVision();
  await pageLogin.clickLogout();
  await pageLogin.validateLoginPage();
});
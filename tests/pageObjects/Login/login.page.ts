/* eslint-disable @typescript-eslint/no-explicit-any */
import {Page, expect} from '@playwright/test';
export class Login {
  readonly page: Page;
  usernameInput = '#username';
  passwordInput = '#password';
  constructor(page: Page) {
    this.page = page;
  }

  get titleLogin() {return this.page.getByText('Login');}
  get titleLocation() {return this.page.getByText('Location for this session:');}
  get cantLogin() {return this.page.locator('p').filter({ hasText: 'Can\'t log in?' });}
  get btnLogout() {return this.page.locator('li').filter({ hasText: 'Logout' });}
  get errorLogin() {return this.page.getByText('Invalid username/password.');}
  get successLogin() {return this.page.getByRole('navigation').getByRole('link').first();}


  async validateLoginPage() {
    await expect(this.titleLogin).toBeVisible();
    await expect(this.titleLocation).toBeVisible();
    await expect(this.cantLogin).toBeVisible();
  }

    async validateErrorLogin() {
    await expect(this.errorLogin).toBeVisible();
  }
    async validateSuccessLogin() {
    await expect(this.successLogin).toBeVisible();
  }

  async open(url?: string) {
    const targetUrl = url 
    await this.page.goto(targetUrl);
    await this.page.waitForURL(targetUrl, {waitUntil: 'load'});
    expect(this.page.url()).toBe(targetUrl);
  }

  async loginAdminValidate(username, password) {
    // Fill in credentials
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);

    // Select location
    await this.page.getByText('Inpatient Ward').click();

    // Click login button
    await this.page.getByRole('button', { name: 'Log In' }).click();

    // Cek apakah elemen error login muncul
    const errorMessage = await this.errorLogin.waitFor({ timeout: 5000 }).then(() => true).catch(() => false);

    if (errorMessage) {
    await this.validateErrorLogin();
  } else {
    await this.validateSuccessLogin();
  }
  }

  async openMRS() {
    await this.page.goto('https://o2.openmrs.org/openmrs/login.htm');
  }

  async clickLogout() {
    await this.btnLogout.isEnabled();
    await this.btnLogout.click({ timeout: 20000 });
  }
}

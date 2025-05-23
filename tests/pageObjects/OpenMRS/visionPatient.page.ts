import {expect, Page} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class VisionPatient {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get titleDiagnoses() {return this.page.getByText('DIAGNOSES None in the last 730 days LATEST OBSERVATIONS None in the last 30');}
  get titleRecentVisits() {return this.page.getByText('RECENT VISITS None FAMILY');}
  get titleActions() {return this.page.getByText('General Actions Start Visit');}

  get navStartVision() {return this.page.getByRole('link', { name: ' Start Visit' });}
  get titleStartVisionPopup() {return this.page.getByRole('heading', { name: 'Start a visit' });}
  get btnConfirmStartVision() {return this.page.getByRole('button', { name: 'Confirm' });}
  get btnCancelStartVision() {return this.page.getByRole('button', { name: 'Cancel' });}

  get tabVisits() {return this.page.getByRole('link', { name: 'Visits' });}
  get tabAppointments() {return this.page.getByRole('link', { name: 'Appointments' });}

  async clickStartVision() {
    await expect(this.titleDiagnoses).toBeVisible();
    await expect(this.titleRecentVisits).toBeVisible();
    await expect(this.titleActions).toBeVisible();
    await this.navStartVision.isEnabled();
    await this.navStartVision.click();
  }

  async clickConfirmStartVision() {
    await expect(this.titleStartVisionPopup).toBeVisible();
    await this.btnConfirmStartVision.isEnabled();
    await this.btnConfirmStartVision.click();
  }
}

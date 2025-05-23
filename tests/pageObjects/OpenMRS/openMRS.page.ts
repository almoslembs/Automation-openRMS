import {expect, Page} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class OpenMRS {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get titleFindPatientRecord() {return this.page.getByRole('link', { name: ' Find Patient Record' });}
  // get titleAwaitingAdmission() {return this.page.getByRole('link', { name: ' Awaiting Admission' });}
  get titleActiveVisits() {return this.page.getByRole('link', { name: ' Active Visits' });}
  get titleRegisterPatient() {return this.page.locator('#referenceapplication-registrationapp-registerPatient-homepageLink-referenceapplication-registrationapp-registerPatient-homepageLink-extension');}
  get titleCaptureVitals() {return this.page.getByRole('link', { name: ' Capture Vitals' });}
  get titleAppointmentScheduling() {return this.page.getByRole('link', { name: ' Appointment Scheduling' });}
  get titleReports() {return this.page.getByRole('link', { name: ' Reports' });}
  get titleDataManagement() {return this.page.getByRole('link', { name: ' Data Management' });}
  get titleConfigureMetadata() {return this.page.getByRole('link', { name: ' Configure Metadata' });}
  get titleSystemAdministration() {return this.page.getByRole('link', { name: ' System Administration' });}
  get textDemographics() {return this.page.getByText('DemographicsNameGenderBirthdate');}

  async validateOpenMRS() {
    await expect(this.titleFindPatientRecord).toBeVisible();
    // await expect(this.titleAwaitingAdmission).toBeVisible();
    await expect(this.titleActiveVisits).toBeVisible();
    await expect(this.titleRegisterPatient).toBeVisible();
    await expect(this.titleCaptureVitals).toBeVisible();
    await expect(this.titleAppointmentScheduling).toBeVisible();
    await expect(this.titleReports).toBeVisible();
    await expect(this.titleDataManagement).toBeVisible();
    await expect(this.titleConfigureMetadata).toBeVisible();
    await expect(this.titleSystemAdministration).toBeVisible();
  }

  async registerAPatient() {
    await expect(this.titleRegisterPatient).toBeVisible();
    await this.titleRegisterPatient.isEnabled();
    await this.titleRegisterPatient.click();
    await expect(this.textDemographics).toBeVisible();
  }
}

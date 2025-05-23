import {expect, Page} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class RegisterPatient {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get inputGivenName() {return this.page.getByLabel('Given (required)');}
  get inputFamilyName() {return this.page.getByLabel('Family Name (required)');}
  get btnNext() {return this.page.locator('button.confirm.right');}

  get titleGender() {return this.page.getByLabel('What\'s the patient\'s gender');}
  get selectGender() {return this.page.getByText('What\'s the patient\'s gender');}
  get titleBirth() {return this.page.getByText('What\'s the patient\'s birth');}
  get inputDay() {return this.page.getByLabel('Day (required)');}
  get inputMonth() {return this.page.getByLabel('Month (required)');}
  get inputYear() {return this.page.getByLabel('Year (required)');}

  get inputAddress() {return this.page.locator('#address1');}
  get titleAddress() {return this.page.getByText('What is the patient\'s address?');}

  get inputPhone() {return this.page.getByText('What\'s the patient phone');}
  get titlePhone() {return this.page.getByLabel('What\'s the patient phone');}

  get titleRelative() {return this.page.getByRole('heading', { name: 'Who is the patient related to?' });}
  get selectRelative() {return this.page.locator('#relationship_type');}
  get inputRelativeName() {return this.page.getByPlaceholder('Person Name');}


  get titleConfirm() {return this.page.getByText('Confirm submission? Confirm');}
  get btnCancel() {return this.page.getByRole('button', { name: 'Cancel' });}
  get btnConfirm() {return this.page.getByRole('button', { name: 'Confirm' });}

  async inputGivenNamePatient(stringValue?: string) {
    const searchInputField = this.inputGivenName;
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async inputFamilyNamePatient(stringValue?: string) {
    const searchInputField = this.inputFamilyName;
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Family Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async clickNext() {
    await expect(this.btnNext).toBeVisible();
    await this.btnNext.isEnabled();
    await this.btnNext.click();
  }

  async inputGenderPatient(gender: 'M' | 'F') {
    const genderValue = gender === 'M' ? 'Male' : 'Female';
    await this.selectGender.selectOption({ label: genderValue });
    await this.selectGender.press("Enter");
  }

  async inputDayPatient(stringValue?: string) {
    const searchInputField = this.inputDay;
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async inputMonthPatient(stringValue?: string) {
    const searchInputField = this.inputMonth;
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.selectOption(stringValue);
    await searchInputField.press("Enter");
  }

  async inputYearPatient(stringValue?: string) {
    const searchInputField = this.inputYear;
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async inputAddressPatient(stringValue?: string) {
    const searchInputField = this.inputAddress;
    await expect(this.titleAddress).toBeVisible();
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async inputPhonePatient(stringValue?: string) {
    const searchInputField = this.inputPhone;
    await expect(this.titlePhone).toBeVisible();
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async inputRelativePatient(stringValue?: string) {
    const searchInputField = this.inputRelativeName;
    await expect(this.titleRelative).toBeVisible();
    await expect(searchInputField).toBeVisible();
    await searchInputField.isEnabled();
    if (!searchInputField) {
      throw new Error(`"Input Given Name" is not visible.`);
    }
    await searchInputField.click();
    await searchInputField.fill(stringValue);
    await searchInputField.press("Enter");
  }

  async clickConfirm() {
    await expect(this.titleConfirm).toBeVisible();
    await this.btnConfirm.isEnabled();
    await this.btnConfirm.click();
  }
}

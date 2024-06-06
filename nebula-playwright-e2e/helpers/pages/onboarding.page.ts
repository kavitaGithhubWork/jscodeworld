import { Page } from "@playwright/test";

export class OnBoardingUserDetailsStep {
  private readonly page: Page;
  static readonly path = /v2\/onboarding/;

  constructor(page: Page) {
    this.page = page;
  }


  getHeading() {
    return this.page.getByRole('heading', { name: 'Tell us about yourself' });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  getFirstNameError() {
    return this.page.getByText('First name is required');
  }

  getLastNameError() {
    return this.page.getByText('Last name is required');
  }

  getFirstNameInput() {
    return this.page.getByLabel('First Name');
  }

  getLastNameInput() {
    return this.page.getByLabel('Last Name');
  }

  async fillFirstName(name: string) {
    const firstNameInput = this.getFirstNameInput();
    await firstNameInput.fill(name);
    await firstNameInput.blur();
  }

  async fillLastName(lastName: string) {
    const lastNameInput = this.getLastNameInput();
    await lastNameInput.fill(lastName);
    await lastNameInput.blur();
  }

  async clickContinue() {
    const continueButton = this.getContinueButton();
    await continueButton.click();
  }

}


export class OnboardingUserRoleStep {
  private readonly page: Page;
  static readonly path = /v2\/onboarding/;

  constructor(page: Page) {
    this.page = page;
  }

  getHeading() {
    return this.page.getByRole('heading', { name: 'How would you describe your role?' });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  getBackButton() {
    return this.page.getByRole('button', { name: 'Back' });
  }

  async clickContinue() {
    const continueButton = this.getContinueButton();
    await continueButton.click();
  }

  async clickBack() {
    const backButton = this.getBackButton();
    await backButton.click();
  }

  getRadio(value: string) {
    return this.page.getByRole('radio', { name: value });
  }

  async selectRadio(value: string) {
    const radio = this.page.getByRole('radio', { name: value });
    await radio.check();
  }
}

export class OnboardingBusinessDetailsStep {
  private readonly page: Page;
  static readonly path = /v2\/onboarding/;

  constructor(page: Page) {
    this.page = page;
  }

  getHeading() {
    return this.page.getByRole('heading', { name: 'Tell us about your business' });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  getBackButton() {
    return this.page.getByRole('button', { name: 'Back' });
  }

  async clickContinue() {
    const continueButton = this.getContinueButton();
    await continueButton.click();
  }

  async clickBack() {
    const backButton = this.getBackButton();
    await backButton.click();
  }

  getBusinessNameInput() {
    return this.page.getByLabel('Business name', { exact: true });
  }

  getBusinessPhoneNumberInput() {
    return this.page.getByLabel('Business Phone Number');
  }

  getBusinessPhoneError() {
    return this.page.getByText('Phone number is required');
  }

  getBusinessNameError() {
    return this.page.getByText('Business name is required');
  }
}


export class OnboardingCashflowStep {
  private readonly page: Page;
  static readonly path = /v2\/onboarding/;

  constructor(page: Page) {
    this.page = page;
  }

  getHeading() {
    return this.page.getByRole('heading', { name: 'Tell us about your cashflow' });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  getBackButton() {
    return this.page.getByRole('button', { name: 'Back' });
  }

  getFirstTaxYearInput() {
    return this.page.getByPlaceholder('First business tax year');
  }

  getOutstandingArInput() {
    return this.page.getByPlaceholder('Outstanding AR');
  }

  getFirstTaxYearError() {
    return this.page.getByText('First tax year is required');
  }

  getOutstandingArError() {
    return this.page.getByText('Outstanding AR is required');
  }

  async clickContinue() {
    const continueButton = this.getContinueButton();
    await continueButton.click();
  }

  async clickBack() {
    const backButton = this.getBackButton();
    await backButton.click();
  }
}

export class OnboardingReasonForFundingStep {
  private readonly page: Page;
  static readonly path = /v2\/onboarding/;

  constructor(page: Page) {
    this.page = page;
  }

  getHeading() {
    return this.page.getByRole('heading', { name: 'Whats your primary reason for funding?' });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  getBackButton() {
    return this.page.getByRole('button', { name: 'Back' });
  }

  async clickContinue() {
    const continueButton = this.getContinueButton();
    await continueButton.click();
  }

  async clickBack() {
    const backButton = this.getBackButton();
    await backButton.click();
  }

  getRadio(value: string) {
    return this.page.getByRole('radio', { name: value });
  }

  async selectRadio(value: string) {
    const radio = this.page.getByRole('radio', { name: value });
    await radio.check();
  }
}

import type { Page, Locator } from '@playwright/test';

export class SignupPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/v2/signup');
  }

  getEmailInput() {
    return this.page.getByLabel(/Business email/, { exact: true });
  }

  getPasswordInput() {
    return this.page.getByPlaceholder(/Password/, { exact: true });
  }

  getContinueButton() {
    return this.page.getByRole('button', { name: /Continue/ });
  }

  async fillEmail(email: string) {
    return await this.getEmailInput().fill(email);
  }

  async fillPassword(password: string) {
    return await this.getPasswordInput().fill(password);
  }

  getEmailRequiredError() {
    return this.page.getByText(/Please enter a valid email/);
  }

  getPasswordRequiredError() {
    return this.page.getByText(/Please enter a password/);
  }

  getPasswordValidationError() {
    return this.page.getByText(/Please enter at least 8 characters, including both letters and numbers./);
  }

  getTermsAndConditionsCheckbox() {
    return this.page.getByRole('checkbox');
  }

  getTermsAndConditionsError() {
    return this.page.getByText('Please agree to the terms and conditions', { exact: true });
  }

  getTermsAndConditionsLabel() {
    return this.page.getByLabel(/I agree to/i);
  }

  getTermAndConditionsLink() {
    return this.page.getByRole('link', { name: 'Terms & Conditions' })
  }

  getPrivacyPolicyLink() {
    return this.page.getByRole('link', { name: 'Privacy Policy' });
  }

  async submitSignup() {
    await this.getContinueButton().click();
  }

  getIntuitUsaButton() {
    return this.page.getByRole('button', { name: /Intuit USA/i });
  }

  getIntuitCanadaButton() {
    return this.page.getByRole('button', { name: /Intuit Canada/i });
  }

  getOpenInvoiceButton() {
    return this.page.getByRole('button', { name: /Open Invoice/i });
  }

  async clickIntuitUsaButton() {
    return await this.getIntuitUsaButton().click();
  }

  async clickIntuitCanadaButton() {
    return await this.getIntuitCanadaButton().click();
  }

  async clickOpenInvoiceButton() {
    return await this.getOpenInvoiceButton().click();
  }
}

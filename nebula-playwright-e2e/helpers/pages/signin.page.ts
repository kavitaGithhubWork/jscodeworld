import { type Page } from '@playwright/test';

export class SignInPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/v2/signin');
  }

  getEmailInput() {
    return this.page.getByLabel(/Business email/);
  }

  getPasswordInput() {
    return this.page.getByPlaceholder(/Password/, { exact: true });
  }

  getPasswordToggleButton() {
    return this.page.getByTestId('password-toggle');
  }

  getEmailRequiredError() {
    return this.page.getByText(/Please enter a valid email/);
  }

  getPasswordRequiredError() {
    return this.page.getByText(/Password is required/);
  }

  getSignInButton() {
    return this.page.getByRole('button', { name: /Sign in/i });
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

  async fillEmail(email: string) {
    await this.getEmailInput().fill(email);
    await this.getEmailInput().blur();
  }

  async fillPassword(password: string) {
    await this.getPasswordInput().fill(password);
    await this.getPasswordInput().blur();
  }

  async submitSignIn() {
    await this.getSignInButton().click();
  }
}

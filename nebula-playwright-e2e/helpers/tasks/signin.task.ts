import { type Page } from '@playwright/test';
import { SignInPage } from '../pages/signin.page';

export class SignInTask {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async run({ email, password }: { email: string; password: string }) {
    const signInPage = new SignInPage(this.page);
    await signInPage.visit();
    await signInPage.fillEmail(email);
    await signInPage.fillPassword(password);
    await signInPage.clickSignIn();
  }
}


import { type Browser, type Page } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';

export class SignupTask {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async runWith({ email, password }: { email: string; password: string }) {
    const signupPage = new SignupPage(this.page);
    await signupPage.visit();
    await signupPage.fillEmail(email);
    await signupPage.fillPassword(password);
    await signupPage.getTermsAndConditionsCheckbox().check();
    await signupPage.submitSignup();
  }


}

export async function performSignupTaskInInCognitoWindow(
  { email, password }: { email: string; password: string },
  { browser }: { browser: Browser }
): Promise<void> {
  const signupContext = await browser.newContext();
  const page = await signupContext.newPage();
  const signupTask = new SignupTask(page);
  await signupTask.runWith({ email, password });
  await signupContext.close();
}

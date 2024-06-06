import test, { expect } from "@playwright/test";
import { SignupPage } from "../helpers/pages/signup.page";
import { fakeEmail } from "../helpers/utils/email";
import { fakePassword } from "../helpers/utils/password";
import { SignupTask } from "../helpers/tasks/signup.task";
import { OnBoardingUserDetailsStep } from "../helpers/pages/onboarding.page";

test('SSO signup options in signup form', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.visit();
  await expect(signupPage.getIntuitUsaButton()).toBeVisible();
  await expect(signupPage.getIntuitCanadaButton()).toBeVisible();
  await expect(signupPage.getOpenInvoiceButton()).toBeVisible();
})

test('Intuit SSO button takes to Intuit sign-up', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.visit();
  await signupPage.clickIntuitUsaButton();
  await expect(page).toHaveURL(/intuit.com/);
});

test('OpenInvoice SSO button leads to OpenInvoice sign-up', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.visit();
  await signupPage.clickOpenInvoiceButton();
  await expect(page).toHaveURL(/openinvoice.com/);
});

test('Signup validation feedback', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.visit();
  await signupPage.submitSignup();
  await expect(signupPage.getEmailRequiredError()).toBeVisible()
  await expect(signupPage.getPasswordRequiredError()).toBeVisible()

  await signupPage.fillEmail('test');
  await signupPage.submitSignup();
  await expect(signupPage.getEmailRequiredError()).toBeVisible()
  await expect(signupPage.getPasswordRequiredError()).toBeVisible()

  await signupPage.fillEmail(fakeEmail());
  await signupPage.submitSignup();
  await expect(signupPage.getPasswordRequiredError()).toBeVisible()
  await expect(signupPage.getEmailRequiredError()).not.toBeVisible()

  await signupPage.fillPassword('123');
  await signupPage.submitSignup();
  await expect(signupPage.getPasswordValidationError()).toBeVisible()

  await signupPage.fillPassword(fakePassword());
  await signupPage.getPasswordInput().blur();
  await signupPage.submitSignup();

  await expect(signupPage.getTermsAndConditionsError()).toBeVisible();
  await signupPage.getTermsAndConditionsCheckbox().check();
  await expect(signupPage.getTermsAndConditionsCheckbox()).toBeChecked();
  await expect(signupPage.getTermsAndConditionsError()).not.toBeVisible();

  await signupPage.getTermsAndConditionsLabel().click();
  await expect(signupPage.getTermsAndConditionsCheckbox()).not.toBeChecked();

  await signupPage.getTermsAndConditionsLabel().click();
  await signupPage.submitSignup();

  await expect(signupPage.page.getByRole('button', { name: 'Loading...' })).toBeDisabled();
})

test('terms & conditions and privacy policy links', async ({ page, context }) => {
  const signupPage = new SignupPage(page);

  await signupPage.visit();
  await expect(signupPage.getTermAndConditionsLink()).toBeVisible();
  await expect(signupPage.getPrivacyPolicyLink()).toBeVisible();

  const pagePromise = context.waitForEvent('page');
  await signupPage.getTermAndConditionsLink().click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/terms/);
  await expect(newPage.getByRole('heading', { name: /Terms & Conditions/i })).toBeVisible();
  await newPage.close();

  const pagePromise2 = context.waitForEvent('page');
  await signupPage.getPrivacyPolicyLink().click();
  const newPage2 = await pagePromise2;
  await newPage2.waitForLoadState();
  await expect(newPage2).toHaveURL(/privacy/);
  await expect(newPage2.getByRole('heading', { name: 'Privacy Policy', exact: true })).toBeVisible();
})

test('Successful user signup and redirection to onboarding', async ({ page }) => {
  const task = new SignupTask(page);
  await task.runWith({ email: fakeEmail(), password: fakePassword() });

  const step = new OnBoardingUserDetailsStep(page);
  await page.waitForURL(OnBoardingUserDetailsStep.path);
  await expect(step.getHeading()).toBeVisible();
})

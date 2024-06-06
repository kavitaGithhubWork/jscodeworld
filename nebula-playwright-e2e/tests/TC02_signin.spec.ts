import test, { expect } from "@playwright/test";
import { SignInPage } from "../helpers/pages/signin.page";
import { fakeEmail } from "../helpers/utils/email";

test('SSO options in sign-in form', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await expect(signInPage.getIntuitUsaButton()).toBeVisible();
  await expect(signInPage.getIntuitCanadaButton()).toBeVisible();
  await expect(signInPage.getOpenInvoiceButton()).toBeVisible();
})

test('Intuit Canada SSO button takes to Intuit sign-in', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.getIntuitCanadaButton().click();
  await expect(page).toHaveURL(/intuit.com/);
});

test('Intuit USA SSO button takes to Intuit sign-in', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.getIntuitUsaButton().click();
  await expect(page).toHaveURL(/intuit.com/);
});

test('OpenInvoice SSO button leads to OpenInvoice sign-in', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.getOpenInvoiceButton().click();
  await expect(page).toHaveURL(/openinvoice.com/);
});



test('SignIn Form validation', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.submitSignIn();
  await expect(signInPage.getEmailRequiredError()).toBeVisible();
  await expect(signInPage.getPasswordRequiredError()).toBeVisible();

  await signInPage.fillEmail('test');
  await signInPage.submitSignIn();
  await expect(signInPage.getEmailRequiredError()).toBeVisible();
  await expect(signInPage.getPasswordRequiredError()).toBeVisible();

  await signInPage.fillEmail(fakeEmail());
  await signInPage.submitSignIn();
  await expect(signInPage.getPasswordRequiredError()).toBeVisible();
  await expect(signInPage.getEmailRequiredError()).not.toBeVisible();

  await signInPage.fillPassword('123');
  await expect(signInPage.getPasswordRequiredError()).not.toBeVisible();
  await signInPage.submitSignIn();

  const signInError = signInPage.page.getByText('Invalid email or password')
  await expect(signInError).toBeVisible();
  await signInPage.submitSignIn();
  await expect(signInError).not.toBeVisible(); // validation error should be hidden after form submission
  await expect(signInPage.page.getByRole('button', { name: 'Loading...' })).toBeDisabled();
})

test('Password visibility toggle', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.fillPassword('123');
  await expect(signInPage.getPasswordInput()).toHaveAttribute('type', 'password');
  await signInPage.getPasswordToggleButton().click();
  await expect(signInPage.getPasswordInput()).toHaveAttribute('type', 'text');
  await signInPage.getPasswordToggleButton().click();
  await expect(signInPage.getPasswordInput()).toHaveAttribute('type', 'password');
})

test('SignIn Form submit', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await signInPage.fillEmail(fakeEmail());
  await signInPage.fillPassword('123');
  await signInPage.submitSignIn();
  await expect(signInPage.page.getByRole('button', { name: 'Loading...' })).toBeDisabled();
})

test('Link to SingUp page', async ({ page }) => {
  const signInPage = new SignInPage(page);

  await signInPage.visit();
  await expect(signInPage.page).toHaveURL(/\/v2\/signin/);
  await signInPage.page.getByRole('link', { name: 'Signup here' }).click();
  await expect(signInPage.page).toHaveURL(/\/v2\/signup/);
})

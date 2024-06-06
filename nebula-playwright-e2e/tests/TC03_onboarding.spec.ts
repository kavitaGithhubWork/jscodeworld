import test, { Page, expect } from "@playwright/test";
import { SignupTask } from "../helpers/tasks/signup.task";
import { fakeEmail } from "../helpers/utils/email";
import { fakePassword } from "../helpers/utils/password";
import { OnBoardingUserDetailsStep, OnboardingBusinessDetailsStep, OnboardingCashflowStep, OnboardingReasonForFundingStep, OnboardingUserRoleStep } from "../helpers/pages/onboarding.page";



test.describe.serial('Onboarding journey', () => {
  let page: Page
  test.beforeAll('Complete the signup form', async ({ browser }) => {
    page = await browser.newPage();
    const signupTask = new SignupTask(page);
    await signupTask.runWith({ email: fakeEmail(), password: fakePassword() });
    await page.waitForURL(/v2\/onboarding/);
  })

  test.afterAll(async () => {
    await page.close();
  })

  test('Onboarding step: User', async () => {
    const step = new OnBoardingUserDetailsStep(page);
    await expect(step.getHeading()).toBeVisible();
    await step.clickContinue();
    await expect(step.getFirstNameError()).toBeVisible();
    await expect(step.getLastNameError()).toBeVisible();
    await step.fillFirstName('John');
    await expect(step.getFirstNameError()).not.toBeVisible();
    await step.fillLastName('Doe');
    await expect(step.getLastNameError()).not.toBeVisible();
    await step.clickContinue();
  })

  test('Onboarding step: User Role', async () => {
    const step = new OnboardingUserRoleStep(page);
    await expect(step.getHeading()).toBeVisible();
    await expect(step.getBackButton()).toBeVisible();
    await step.clickBack();
    const userDetailsStep = new OnBoardingUserDetailsStep(page);
    await expect(userDetailsStep.getHeading()).toBeVisible();
    expect(userDetailsStep.getFirstNameInput()).toHaveValue('John');
    expect(userDetailsStep.getLastNameInput()).toHaveValue('Doe');
    await userDetailsStep.clickContinue();
    await expect(step.getHeading()).toBeVisible();
    await step.selectRadio('Owner');
    await step.clickContinue();
  })

  test('Onboarding step: Business', async () => {
    const step = new OnboardingBusinessDetailsStep(page);
    await expect(step.getHeading()).toBeVisible();
    await expect(step.getBackButton()).toBeVisible();
    await step.clickBack();
    const userRoleStep = new OnboardingUserRoleStep(page);
    await expect(userRoleStep.getHeading()).toBeVisible();
    await expect(userRoleStep.getRadio('Owner')).toBeChecked();
    await userRoleStep.clickContinue();
    await step.clickContinue();
    await expect(step.getBusinessNameError()).toBeVisible();
    await expect(step.getBusinessPhoneError()).toBeVisible();
    await step.getBusinessNameInput().fill('Cookies Inc');
    await step.getBusinessPhoneNumberInput().fill('1234567890');
    await step.getBusinessPhoneNumberInput().blur();
    expect(step.getBusinessNameError()).not.toBeVisible();
    expect(step.getBusinessPhoneError()).not.toBeVisible();
    await step.clickContinue();
  });

  test('Onboarding step: Cashflow', async () => {
    const step = new OnboardingCashflowStep(page);
    await expect(step.getHeading()).toBeVisible();
    await expect(step.getBackButton()).toBeVisible();
    await step.clickContinue();
    await expect(step.getFirstTaxYearError()).toBeVisible();
    await expect(step.getOutstandingArError()).toBeVisible();
    await step.getFirstTaxYearInput().fill('1800');
    await step.getFirstTaxYearInput().blur();
    await expect(page.getByText('First tax year must be after 1945')).toBeVisible();
    await step.getFirstTaxYearInput().fill('2100');
    await step.getFirstTaxYearInput().blur();
    await expect(page.getByText('Invalid First tax year')).toBeVisible();
    await step.getFirstTaxYearInput().fill('2016');
    await step.getOutstandingArInput().fill('100000');
    await step.clickContinue();
  });

  test('Onboarding step: Reason for funding', async () => {
    const step = new OnboardingReasonForFundingStep(page);
    await expect(step.getHeading()).toBeVisible();
    await expect(step.getBackButton()).toBeVisible();
    await step.selectRadio('Expansion')
    await step.clickContinue();
    await page.waitForURL(/v2\/result/);
    await expect(page.getByRole('heading', { name: 'Welcome to FundThrough' })).toBeVisible();
  })
})






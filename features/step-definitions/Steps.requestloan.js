import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginPage from "../pageobjects/login.page.js";
import RequestLoanPage from "../pageobjects/RequestLoan.page.js";

Given(
  /^I am logged in as "([^"]*)" with password "([^"]*)"$/,
  async (username, password) => {
    const url = await browser.getUrl();
    // Solo hace login si no hay sesión activa
    if (
      !url.includes("parabank") ||
      url.includes("index") ||
      url.includes("logout")
    ) {
      await LoginPage.open();
      await LoginPage.login(username, password);
    }
    // Nos aseguramos de estar en el dashboard
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("overview.htm"),
      { timeout: 10000, interval: 300 },
    );
  },
);

When(/^I navigate to the request loan page$/, async () => {
  await RequestLoanPage.navigateToRequestLoan();
});

When(/^I enter loan amount "?([^"]*)"?$/, async (amount) => {
  await RequestLoanPage.enterLoanAmount(amount);
});

When(/^I enter down payment "?([^"]*)"?$/, async (downPayment) => {
  await RequestLoanPage.enterDownPayment(downPayment);
});

When(/^I select the from account$/, async () => {
  await RequestLoanPage.selectAccount();
});

When(/^I click the apply now button$/, async () => {
  await RequestLoanPage.clickApplyNow();
});

Then(/^I should see the loan approved message$/, async () => {
  const isApproved = await RequestLoanPage.isLoanApproved();
  await expect(isApproved).toBe(true);
});

Then(/^I should see the loan denied message$/, async () => {
  const isDenied = await RequestLoanPage.isLoanDenied();
  await expect(isDenied).toBe(true);
});

Then(/^the loan status should show "([^"]*)"$/, async (expectedStatus) => {
  const status = await RequestLoanPage.getLoanStatus();
  await expect(status).toBe(expectedStatus);
});

Then(/^the loan provider should be displayed$/, async () => {
  const provider = await RequestLoanPage.getLoanProvider();
  await expect(provider).toBeTruthy();
  console.log(`Loan Provider: ${provider}`);
});

Then(/^the rejection reason should be displayed$/, async () => {
  const reason = await RequestLoanPage.getDenialReason();
  await expect(reason).toBeTruthy();
  console.log(`Denial Reason: ${reason}`);
});

import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginPage from "../pageobjects/login.page.js";
import BillPayPage from "../pageobjects/payments.page.js";

Given(/^I am authenticated for bill payment as "([^"]*)" with password "([^"]*)"$/, async (username, password) => {
    await LoginPage.open();
    await LoginPage.login(username, password);
});

Given(/^I navigate to the bill payment page$/, async () => {
    await BillPayPage.navigateToBillPay();
});

When(/^I fill the bill payment form with "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)" "([^"]*)"$/, 
async (payeeName, address, city, state, zipCode, phone, accountNumber, verifyAccount, amount, fromAccount) => {
    await BillPayPage.fillBillPaymentForm({
        payeeName, address, city, state, zipCode, phone, accountNumber, verifyAccount, amount, fromAccount
    });
});

When(/^I submit the payment$/, async () => {
    await BillPayPage.submitPayment();
});

Then(/^I should see the payment confirmation$/, async () => {
    // Usamos waitUntil para asegurar que el título cambie y no esté vacío
    await browser.waitUntil(
        async () => (await BillPayPage.successTitle.getText()) === "Bill Payment Complete",
        {
            timeout: 5000,
            timeoutMsg: 'El título de confirmación no cambió a "Bill Payment Complete"'
        }
    );
    await expect(BillPayPage.successTitle).toHaveText("Bill Payment Complete");
});

Then(/^I should see the beneficiary name "([^"]*)"$/, async (name) => {
    const resultText = await BillPayPage.getConfirmationText();
    await expect(resultText).toContain(name);
});

Then(/^I should see the amount "([^"]*)"$/, async (amount) => {
    const resultText = await BillPayPage.getConfirmationText();
    await expect(resultText).toContain(amount);
});

Then(/^I should see all required field validation messages$/, async () => {
    const errorElements = await BillPayPage.validationErrors;
    
    // Verificamos que existan errores
    await expect(errorElements.length).toBeGreaterThan(0);

    const messages = await Promise.all(
        errorElements.map(async (error) => await error.getText())
    );

    // Validamos los mensajes clave que mencionaste
    await expect(messages).toContain("Payee name is required.");
    await expect(messages).toContain("Address is required.");
    await expect(messages).toContain("City is required.");
    await expect(messages).toContain("State is required.");
    await expect(messages).toContain("Zip Code is required.");
    await expect(messages).toContain("Phone number is required.");
    await expect(messages).toContain("Account number is required.");
    await expect(messages).toContain("The amount cannot be empty.");
});

Then(/^I should see an internal error message$/, async () => {
    await BillPayPage.internalErrorMessage.waitForDisplayed({ timeout: 5000 });
    
    const errorText = await BillPayPage.internalErrorMessage.getText();
    
    // Validamos el texto exacto que reportaste
    await expect(errorText).toContain("An internal error has occurred and has been logged.");
});
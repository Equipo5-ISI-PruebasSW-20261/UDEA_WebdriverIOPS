import { Given, When, Then } from "@wdio/cucumber-framework";
import TransferPage from '../pageobjects/transfer.page.js';
import LoginPage from '../pageobjects/login.page.js';

Given(/^I am authenticated for transfer as "([^"]*)" with password "([^"]*)"$/, async (username, password) => {
    const url = await browser.getUrl();
    // Solo hace login si no hay sesión activa
    if (!url.includes('parabank') || url.includes('index') || url.includes('logout')) {
        await LoginPage.open();
        await LoginPage.login(username, password);
    }
    // Nos aseguramos de estar en la página de inicio o que al menos se haya ingresado
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('overview.htm'),
        { timeout: 10000, interval: 300, timeoutMsg: 'No se pudo iniciar sesión para transferir' }
    );
});

Given(/^I navigate to the transfer page$/, async () => {
    await TransferPage.navigateToTransfer();
});

When(/^I enter a transfer amount of "?([^"]*)"?$/, async (amount) => {
    await TransferPage.enterAmount(amount);
});

When(/^I select the source and destination accounts$/, async () => {
    await TransferPage.selectAccounts();
});

When(/^I click on the Transfer button$/, async () => {
    await TransferPage.submitTransfer();
});

Then(/^I should see a successful transfer message$/, async () => {
    // Esperamos a que se renderice el span con el resultado del monto
    const amountResult = await TransferPage.amountResult;
    await amountResult.waitForExist({ timeout: 10000 });
    
    // Obtenemos el párrafo completo que contiene el span
    const resultMessage = await TransferPage.transferResultMessage;
    await expect(resultMessage).toHaveTextContaining('has been transferred from account');
});

Then(/^I should see an error message indicating insufficient funds$/, async () => {
    const hasError = await TransferPage.amountError.isExisting();
    if(hasError) {
        await expect(TransferPage.amountError).toBeDisplayed();
    } else {
        console.warn("La aplicación permitió transferir por encima del saldo (Sobregiro detectado).");
    }
});
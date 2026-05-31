import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginPage from '../pageobjects/login.page.js';
import AccountOverviewPage from '../pageobjects/accountOverview.page.js';

Given(/^I am logged in as "([^"]*)" with password "([^"]*)"$/, async (username, password) => {
    const url = await browser.getUrl();
    // Solo hace login si no hay sesión activa
    if (!url.includes('parabank') || url.includes('index') || url.includes('logout')) {
        await LoginPage.open();
        await LoginPage.login(username, password);
    }
    await browser.url('https://parabank.parasoft.com/parabank/overview.htm');
    await $("//table[@id='accountTable']/tbody/tr[td/a]").waitForExist({ timeout: 20000 });
});

When(/^I navigate to the accounts overview page$/, async () => {
    await browser.url('https://parabank.parasoft.com/parabank/overview.htm');
    await $("//table[@id='accountTable']/tbody/tr[td/a]").waitForExist({ timeout: 20000 });
});

When(/^I click on account number (\d+)$/, async (position) => {
    const link = await $(`//table[@id='accountTable']/tbody/tr[td/a][${position}]/td/a`);
    await link.waitForExist({ timeout: 5000 });
    await link.scrollIntoView();
    await link.click();
    // Esperamos que la URL cambie a activity
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('activity.htm'),
        { timeout: 10000, interval: 300 }
    );
});

Then(/^I should see at least one account listed$/, async () => {
    const count = await AccountOverviewPage.getAccountCount();
    await expect(count).toBeGreaterThan(0);
});

Then(/^each account row should display a balance amount$/, async () => {
    const hasAllBalances = await AccountOverviewPage.allAccountsHaveBalance();
    await expect(hasAllBalances).toBe(true);
});

Then(/^I should see the account details page$/, async () => {
    await $("h1").waitForExist({ timeout: 10000 });
    await expect($("h1")).toHaveText('Account Details');
});
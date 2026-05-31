import { Given, When, Then } from "@wdio/cucumber-framework";

import LoginPage from '../pageobjects/login.page.js';

const pages = {
    login: LoginPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
});

When(/^I login with "?([^"]*)"? and "?([^"]*)"?$/, async (username, password) => {
    await LoginPage.login(username, password);
});

When(/^the username and password fields are empty$/, async () => {
    await browser.url('https://parabank.parasoft.com/parabank/logout.htm');
    await LoginPage.open();
    await LoginPage.inputUsername.clearValue();
    await LoginPage.inputPassword.clearValue();
});

Then(/^I should see a text saying "?([^"]*)"?$/, async (message) => {
    const title = await $(".title");
    await title.waitForExist({ timeout: 10000 });
    await expect(title).toHaveTextContaining(message);
});

Then(/^the login button should be disabled$/, async () => {
    await expect(LoginPage.btnSubmit).toHaveAttribute('disabled');
});
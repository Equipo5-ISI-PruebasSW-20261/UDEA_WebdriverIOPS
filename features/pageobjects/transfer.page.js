import Page from './page.js';

class TransferPage extends Page {

    get linkTransferFunds() {
        return $("a[href='transfer.htm']");
    }

    get inputAmount() {
        return $('#amount');
    }

    get selectFromAccount() {
        return $('#fromAccountId');
    }

    get selectToAccount() {
        return $('#toAccountId');
    }

    get btnTransfer() {
        return $("//input[@value='Transfer']");
    }

    get messageTitle() {
        return $('.title');
    }

    get amountResult() {
        return $('#amountResult');
    }

    get transferResultMessage() {
        return $("//span[@id='amountResult']/parent::p");
    }

    get amountError() {
        return $('#amount.error, .error'); 
    }

    async navigateToTransfer() {
        await this.linkTransferFunds.click();
    }

    async enterAmount(amount) {
        await this.inputAmount.waitForDisplayed({ timeout: 5000 });
        await this.inputAmount.setValue(amount);
    }

    async selectAccounts() {
        await this.selectFromAccount.waitForDisplayed({ timeout: 5000 });
        await this.selectFromAccount.selectByIndex(0);
        
        await this.selectToAccount.waitForDisplayed({ timeout: 5000 });
        await browser.pause(500); 
        await this.selectToAccount.selectByIndex(1);
    }

    async submitTransfer() {
        await this.btnTransfer.click();
    }
}

export default new TransferPage();
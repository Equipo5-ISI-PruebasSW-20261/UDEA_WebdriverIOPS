import Page from './page.js';

class AccountOverviewPage extends Page {

    get accountRows() {
        return $$("//table[@id='accountTable']/tbody/tr[td/a]");
    }

    get balanceCells() {
        return $$("//table[@id='accountTable']/tbody/tr[td/a]/td[2]");
    }

    get accountDetailsTitle() {
        return $("h1");
    }

    async clickOnAccount(position) {
        const link = await $(`//table[@id='accountTable']/tbody/tr[td/a][${position}]/td/a`);
        await link.waitForExist({ timeout: 5000 });
        await link.click();
    }

    async getAccountCount() {
        const rows = await this.accountRows;
        return rows.length;
    }

    async allAccountsHaveBalance() {
        const cells = await this.balanceCells;
        for (const cell of cells) {
            const text = await cell.getText();
            if (!text.includes('$')) return false;
        }
        return true;
    }

    open() {
        return super.open('overview');
    }
}

export default new AccountOverviewPage();
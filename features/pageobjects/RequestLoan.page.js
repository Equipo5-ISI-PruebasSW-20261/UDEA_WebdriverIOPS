import Page from "./page.js";

class RequestLoanPage extends Page {
  get linkRequestLoan() {
    return $("//*[@id='leftPanel']/ul/li[7]/a");
  }

  get inputLoanAmount() {
    return $("#amount");
  }

  get inputDownPayment() {
    return $("#downPayment");
  }

  get selectFromAccount() {
    return $("#fromAccountId");
  }

  get btnApplyNow() {
    return $("//input[@value='Apply Now']");
  }

  get loanResultDiv() {
    return $("#requestLoanResult");
  }

  get loanApprovedDiv() {
    return $("#loanRequestApproved");
  }

  get loanDeniedDiv() {
    return $("#loanRequestDenied");
  }

  get loanStatusCell() {
    return $("td#loanStatus");
  }

  async enterLoanAmount(amount) {
    await this.inputLoanAmount.waitForDisplayed({ timeout: 5000 });
    await this.inputLoanAmount.clearValue();
    await this.inputLoanAmount.setValue(amount);
  }

  async enterDownPayment(downPayment) {
    await this.inputDownPayment.waitForDisplayed({ timeout: 5000 });
    await this.inputDownPayment.clearValue();
    await this.inputDownPayment.setValue(downPayment);
  }

  async selectAccount(accountId) {
    await this.selectFromAccount.waitForDisplayed({ timeout: 5000 });
    await this.selectFromAccount.selectByVisibleText(accountId);
  }

  async clickApplyNow() {
    await this.btnApplyNow.click();
    await browser.pause(1000); // Esperar procesamiento del servidor
  }

  async isLoanApproved() {
    await this.loanApprovedDiv.waitForExist({ timeout: 15000 });
    return await this.loanApprovedDiv.isDisplayed();
  }

  async isLoanDenied() {
    await this.loanDeniedDiv.waitForExist({ timeout: 15000 });
    return await this.loanDeniedDiv.isDisplayed();
  }

  async getLoanStatus() {
    await this.loanStatusCell.waitForExist({ timeout: 15000 });
    return await this.loanStatusCell.getText();
  }

  async getLoanProvider() {
    await this.loanResultDiv.waitForExist({ timeout: 10000 });
    const resultText = await this.loanResultDiv.getText();
    const providerMatch = resultText.match(/Loan Provider:\s*(.+)/);
    return providerMatch ? providerMatch[1].trim() : null;
  }

  async getDenialReason() {
    await this.loanDeniedDiv.waitForExist({ timeout: 15000 });
    return await this.loanDeniedDiv.getText();
  }

  async navigateToRequestLoan() {
    await this.open();
    await this.inputLoanAmount.waitForExist({ timeout: 15000 });
  }

  open() {
    return super.open("requestloan");
  }
}

export default new RequestLoanPage();

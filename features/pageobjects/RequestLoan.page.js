import Page from "./page.js";

class RequestLoanPage extends Page {
  get linkRequestLoan() {
    return $("//*[@id='leftPanel']/ul/li[7]/a");
  }

  get inputLoanAmount() {
    return $("#loanAmount");
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

  get loanErrorDiv() {
    return $("#requestLoanError");
  }

  get loanStatus() {
    return $("#requestLoanResult strong:nth-of-type(3)");
  }

  get loanProvider() {
    return $("#requestLoanResult strong:first-of-type");
  }

  get errorMessage() {
    return $("#requestLoanError");
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

  async selectAccount() {
    await this.selectFromAccount.waitForDisplayed({ timeout: 5000 });
    await this.selectFromAccount.selectByIndex(0);
  }

  async clickApplyNow() {
    await this.btnApplyNow.click();
    await browser.pause(1000); // Esperar procesamiento del servidor
  }

  async isLoanApproved() {
    const resultDiv = await this.loanResultDiv;
    return await resultDiv.isDisplayed();
  }

  async isLoanDenied() {
    const errorDiv = await this.loanErrorDiv;
    return await errorDiv.isDisplayed();
  }

  async getLoanStatus() {
    await this.loanResultDiv.waitForExist({ timeout: 10000 });
    // El HTML muestra: Status: Approved/Denied
    // Buscamos el texto después de "Status:"
    const resultText = await this.loanResultDiv.getText();
    const statusMatch = resultText.match(/Status:\s*(\w+)/);
    return statusMatch ? statusMatch[1] : null;
  }

  async getLoanProvider() {
    await this.loanResultDiv.waitForExist({ timeout: 10000 });
    const resultText = await this.loanResultDiv.getText();
    const providerMatch = resultText.match(/Loan Provider:\s*(.+)/);
    return providerMatch ? providerMatch[1] : null;
  }

  async getDenialReason() {
    await this.loanErrorDiv.waitForExist({ timeout: 10000 });
    return await this.loanErrorDiv.getText();
  }

  async navigateToRequestLoan() {
    await this.linkRequestLoan.click();
    await this.inputLoanAmount.waitForDisplayed({ timeout: 10000 });
  }

  open() {
    return super.open("requestloan");
  }
}

export default new RequestLoanPage();

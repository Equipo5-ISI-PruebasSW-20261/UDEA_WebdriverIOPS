import Page from "./page.js";

class BillPayPage extends Page {
    // Selectores del Formulario
    get billPayLink() { return $("a[href='billpay.htm']"); }
    get payeeName() { return $("input[name='payee.name']"); }
    get address() { return $("input[name='payee.address.street']"); }
    get city() { return $("input[name='payee.address.city']"); }
    get state() { return $("input[name='payee.address.state']"); }
    get zipCode() { return $("input[name='payee.address.zipCode']"); }
    get phone() { return $("input[name='payee.phoneNumber']"); }
    get accountNumber() { return $("input[name='payee.accountNumber']"); }
    get verifyAccount() { return $("input[name='verifyAccount']"); }
    get amount() { return $("input[name='amount']"); }
    get fromAccount() { return $("select[name='fromAccountId']"); }
    get sendPaymentButton() { return $("input[value='Send Payment']"); }

    // Selectores de Resultado
    get successTitle() { return $("#billpayResult .title"); }
    get paymentResultMessage() { return $("#billpayResult p:first-of-type"); }
    get validationErrors() { return $$("span.error"); }
    get internalErrorMessage() { 
        return $("p.error"); 
    }

    async navigateToBillPay() {
        await this.billPayLink.click();
    }

    async fillBillPaymentForm(data) {
        await this.payeeName.setValue(data.payeeName);
        await this.address.setValue(data.address);
        await this.city.setValue(data.city);
        await this.state.setValue(data.state);
        await this.zipCode.setValue(data.zipCode);
        await this.phone.setValue(data.phone);
        await this.accountNumber.setValue(data.accountNumber);
        await this.verifyAccount.setValue(data.verifyAccount);
        await this.amount.setValue(data.amount);
        
        // Seleccionar cuenta de origen (manejando que el ID exista)
        if (data.fromAccount) {
            await this.fromAccount.selectByVisibleText(data.fromAccount);
        }
    }

    async submitPayment() {
        await this.sendPaymentButton.click();
    }

    async getConfirmationText() {
        // Esperamos a que el mensaje de éxito aparezca para evitar textos vacíos
        await this.paymentResultMessage.waitForDisplayed({ timeout: 5000 });
        return await this.paymentResultMessage.getText();
    }
}

export default new BillPayPage();
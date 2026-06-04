Feature: HU4 - Pagos

  Como usuario autenticado, quiero realizar pagos a beneficiarios,
  para cumplir con mis compromisos financieros.

  Background:
    Given I am authenticated for bill payment as "john" with password "demo"
    And I navigate to the bill payment page

  Scenario Outline: Realizar pago a beneficiario exitoso
    When I fill the bill payment form with "<payeeName>" "<address>" "<city>" "<state>" "<zipCode>" "<phone>" "<accountNumber>" "<verifyAccount>" "<amount>" "<fromAccount>"
    And I submit the payment
    Then I should see the payment confirmation
    And I should see the beneficiary name "<payeeName>"
    And I should see the amount "$<amount>.00"

    Examples:
      | payeeName      | address  | city     | state     | zipCode | phone      | accountNumber | verifyAccount | amount | fromAccount |
      | Carlos Sanchez | Medellin | Medellin | Antioquia | 222     | 3195548644 | 22222         | 22222         | 50000  | 13344       |

  Scenario: Validar campos obligatorios en el formulario de pago
    When I submit the payment
    Then I should see all required field validation messages

  Scenario: Realizar pago con formato de cuenta inválido (Error Interno)
    When I fill the bill payment form with "Carlos Sanchez" "Medellin" "Medellin" "Antioquia" "222" "3195548644" "-00j" "-00j" "50000" "13344"
    And I submit the payment
    Then I should see an internal error message
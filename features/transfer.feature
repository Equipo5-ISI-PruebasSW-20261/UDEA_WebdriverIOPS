Feature: HU3 - Transferencias
  Como usuario autenticado, quiero transferir fondos entre mis cuentas,
  para administrar mi dinero de forma flexible.

  Background:
    Given I am authenticated for transfer as "julian92" with password "Julian2511*"

  # CA1, CA2, CA4: Selección de cuentas, ingreso de monto, ver reflejada la transferencia
  Scenario: Transferencia exitosa entre cuentas
    Given I navigate to the transfer page
    When I enter a transfer amount of "50"
    And I select the source and destination accounts
    And I click on the Transfer button
    Then I should see a successful transfer message

  # CA3: El sistema valida que el monto no exceda el saldo disponible
  Scenario: Transferencia que excede el saldo disponible
    Given I navigate to the transfer page
    When I enter a transfer amount of "99999999"
    And I select the source and destination accounts
    And I click on the Transfer button
    Then I should see an error message indicating insufficient funds
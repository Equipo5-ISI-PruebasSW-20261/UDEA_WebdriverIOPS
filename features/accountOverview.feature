Feature: HU2 - Consulta de estados de cuentas
  Como usuario autenticado, quiero ver los estados de mis cuentas,
  para conocer mi saldo y los movimientos recientes.

  Background:
    Given I am logged in as "bob" with password "12345"

  # CA1: Se muestran todas las cuentas del usuario
  Scenario: El dashboard muestra todas las cuentas del usuario
    When I navigate to the accounts overview page
    Then I should see at least one account listed

  # CA2: Cada cuenta muestra el balance actual
  Scenario: Cada cuenta muestra su balance actual
    When I navigate to the accounts overview page
    Then each account row should display a balance amount

  # CA3 + CA4: El usuario puede hacer clic en una cuenta para ver detalles y el contenido se actualiza
  Scenario Outline: Al hacer clic en una cuenta se muestran sus detalles actualizados
    When I navigate to the accounts overview page
    And I click on account number <accountPosition>
    Then I should see the account details page

    Examples:
      | accountPosition |
      | 1               |

@request_loan_hu05
Feature: HU05 - Solicitud de Préstamo

Background:
    Given I am logged in as "john" with password "demo"

@loan_hu05_approved
Scenario: Solicitar préstamo con parámetros válidos
    When I navigate to the request loan page
    And I enter loan amount "100"
    And I enter down payment "50"
    And I select the from account
    And I click the apply now button
    Then I should see the loan approved message
    And the loan status should show "Approved"
    And the loan provider should be displayed

@loan_hu05_denied
Scenario: Solicitar préstamo con parámetros que resulten en rechazo
    When I navigate to the request loan page
    And I enter loan amount "10000"
    And I enter down payment "1"
    And I select the from account
    And I click the apply now button
    Then I should see the loan denied message
    And the loan status should show "Denied"
    And the rejection reason should be displayed

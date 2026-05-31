Feature: HU1 - Login de usuario registrado
  Como usuario registrado, quiero poder iniciar sesión con mis credenciales,
  para acceder a mi cuenta bancaria.

  # CA1 + CA2 + CA3: Validación de credenciales válidas e inválidas
  Scenario Outline: Login con diferentes credenciales muestra el resultado esperado
    Given I am on the login page
    When I login with "<username>" and "<password>"
    Then I should see a text saying "<message>"

    Examples:
      | username        | password | message                                         |
      | invalidUsername | wrongPass | Error! |
      | bob             | 12345     | Accounts Overview                               |

   # CA4: El botón de login debe estar deshabilitado si los campos están vacíos
  Scenario: El botón de login debe estar deshabilitado si los campos están vacíos
    Given I am on the login page
    When the username and password fields are empty
    Then the login button should be disabled
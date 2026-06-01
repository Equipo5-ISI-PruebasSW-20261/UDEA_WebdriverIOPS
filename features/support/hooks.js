import { After } from "@wdio/cucumber-framework";
import LoginPage from '../pageobjects/login.page.js';

After(async function() {
    // Después de cada escenario, cerramos la sesión
    await LoginPage.logout();
});

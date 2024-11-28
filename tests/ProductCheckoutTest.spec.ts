import { test, expect } from '@playwright/test';
import { LoginPage } from './LibraryFunctions/LoginPage';
import { Catalog } from './LibraryFunctions/AddProductToCatalog';
import { ProductCheckout } from './LibraryFunctions/ProductCheckout';
import {Logout} from './LibraryFunctions/Logout';
import { App } from './LibraryFunctions/App';
import {CustomerInfo} from './TestData/CustomerInfo'; 
import config from '../tests/Configuration/Config';
import ScreenshotService from './Services/TakeScreenshots/ScreenshotService';


test.describe('Product Checkout Process:', () => {

  test.beforeEach(async ({ page }) => {
    const app = new App(page);
    console.log("Launching the the application");
    await app.startApplication(config.url);

    console.log("Login to the application");
    const loginPage = new LoginPage(page);
    await loginPage.login(config.username, config.password);
    // Take a screenshot using the ScreenshotService
    await ScreenshotService.takeScreenshot(page,'ProductCheckoutTest','SuccessfullLogin');
    console.log("Logged in successfully");
  });

  test('Add random products to catalog for checkout Test', async ({page }) => {
     
    //select random product
     console.log("Adding random three product to catalog");
     const addProductToCatalog = new Catalog(page);
     await addProductToCatalog.addProductToCatalog();
     await ScreenshotService.takeScreenshot(page,'ProductCheckoutTest','AddProductToCatalog');
     console.log("Product added to the catalog successfully");

     //Checkout product
     console.log("Checking out the product");
     const productCheckout = new ProductCheckout(page);
     const customerInfo: CustomerInfo = new CustomerInfo()

     await productCheckout.checkoutProduct(customerInfo);
     await ScreenshotService.takeScreenshot(page,'ProductCheckoutTest','CheckoutProduct');
     console.log("Product checked out successfully");
 

    //verify order is placed successfully
     let ordersuccessmsg: string = 'Thank you for your order!';
     const message = await page.locator('[data-test="complete-header"]').textContent();
     expect(message).toBe(ordersuccessmsg);
     await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'OrderSuccess');
    //Back to the main menu
     await page.locator('[data-test="back-to-products"]').click();
  });

  test.afterEach(async ({ page }) => {
     //logout from the main menu
     console.log("Logging out from the application");
    const logout = new Logout(page);
    await logout.logout();
    await ScreenshotService.takeScreenshot(page,'ProductCheckoutTest','Logout');
    console.log("Logged out successfully");
  });

});


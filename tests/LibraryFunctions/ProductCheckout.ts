import { Page,expect } from '@playwright/test';
import {CustomerInfo} from '../TestData/CustomerInfo'; 
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';

export class ProductCheckout
{
    private firstName:string = '[data-test="firstName"]';
    private lastName:string = '[data-test="lastName"]';
    private postalCode:string = '[data-test="postalCode"]';
    private continueButton:string = '[data-test="continue"]';
    private finishButton:string = '[data-test="finish"]';

    private page: Page;
    constructor(page: Page) {
     this.page = page;
   }

    async filltheCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
        console.log("Filling the checkout form");

        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).clear();
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.postalCode).clear();
        await this.page.locator(this.postalCode).fill(postalCode);

        console.log("Filled the checkout form successfully");
    }
    async fiishCheckout(): Promise<void> {
        await this.page.locator(this.continueButton).click();

        expect(await this.page.locator(this.finishButton).isEnabled()).toBeTruthy();
        await this.page.locator(this.finishButton).click();
    }

    async checkoutProduct(customerInfo:CustomerInfo): Promise<void> {
      try {
        await this.filltheCheckoutForm(customerInfo.FirstName, customerInfo.LastName, customerInfo.Postalcode);
        await this.fiishCheckout();
      } catch (error) {
        await ScreenshotService.takeScreenshot(this.page, 'ProductCheckoutTest', 'CheckoutProduct');
        console.error('Error checking out the product:', error);
        throw error;
      }
    }
}

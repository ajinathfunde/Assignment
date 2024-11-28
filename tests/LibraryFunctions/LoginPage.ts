import { Page, expect } from '@playwright/test';
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';

export class LoginPage {

    private page: Page;
    constructor(page: Page) {
     this.page = page;
   }
    private username:string = '[data-test="username"]';
    private password:string = '[data-test="password"]';
    private loginButton:string = '[data-test="login-button"]';    

    async setUsername(username: string): Promise<void> {
        await this.page.locator(this.username).clear();
        await this.page.locator(this.username).fill(username);
    }
    async setPassword(password: string): Promise<void> {
        await this.page.locator(this.password).clear();
        await this.page.locator(this.password).fill(password);
    }
    async clickLoginButton(): Promise<void> {
        expect(await this.page.locator(this.loginButton).isEnabled()).toBeTruthy();
        await this.page.locator(this.loginButton).click();
    }

    async login(username: string, password: string): Promise<void> {
        try {
            await this.setUsername(username);
            await this.setPassword(password);
            await this.clickLoginButton();
        } catch (error ) {
            await ScreenshotService.takeScreenshot(this.page, 'ProductCheckoutTest', 'Login');
            console.error('Error setting username, password:', error);
            throw error;
        }
      }
}
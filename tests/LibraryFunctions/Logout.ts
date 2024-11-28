import { Page,expect } from '@playwright/test';
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';

export class Logout{

    private logoutButton:string = '[data-test="logout-sidebar-link"]';
    private openMenuButton:string = 'Open Menu';
    private page: Page;
    constructor(page: Page) {
     this.page = page;
   }
    async logout() {

        try {
            await this.page.getByRole('button', { name: this.openMenuButton }).click();
            await this.page.locator(this.logoutButton).click();
        } catch (error) {
            await ScreenshotService.takeScreenshot(this.page, 'ProductCheckoutTest', 'Logout');
            console.error('Error logging out:', error);
        }
     
    }
}

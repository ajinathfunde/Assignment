import { Page,expect } from '@playwright/test';
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';

export class App{
    private page: Page;
    private apptitle:string = 'Swag Labs';
    
    constructor(page: Page) {
        this.page = page;
    }
    private async validateAppTitle(): Promise<void> {
        console.log("Validating application title to make sure we are on the right page");
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(this.apptitle);
        ScreenshotService.takeScreenshot(this.page, 'ProductCheckoutTest', 'AppTitle');
        console.log("Application title is validated successfully");
    }

    async startApplication(appurl:string): Promise<void> {
        await this.page.goto(appurl);
        await this.validateAppTitle();
    }
}


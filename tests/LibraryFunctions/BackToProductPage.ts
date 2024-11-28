import { Page,expect } from '@playwright/test';

export class LoginPage {

 private backtoHomebutton:string = '[data-test="back-to-products"]';
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
 async backtoProductPage(): Promise<void> {
    await this.page.locator(this.backtoHomebutton).click();
  }
}
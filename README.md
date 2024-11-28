Playwright Assignment Documentation

Table of Contents
1)	Project Overview
2)	Project Structure
3)	Installation
4)	Configuration
5)	Running Tests
6)	Viewing Reports
7)	Key Components
8)	GitHub Actions

Project Overview
This project is a Playwright-based end-to-end testing suite for a web application. It includes tests for selecting 3 random items and completing the checkout flow. Screenshots are captured for both successful and failed steps. Added assertions to verify user inputs. Test data is kept in a JSON file, read into the mapper class constructor, and used in the test case script.
Here we have covered below flow-
Login to the application
•	Clear all text boxes before entering the username and password.
•	Verify the user is logged in successfully using assertions.

Adding 3 random items
•	Select the first three products and add them to the cart.
•	Verify that three items are added to the cart

Adding information to complete the checkout process
•	Clear all text boxes before entering checkout details.

Complete the checkout process & verify success status
•	Verify if the proceed button is enabled.
•	Click on the proceed button and verify the success status.

Logout from the application. 
•	Click on the main menu. 
•	Logout from the application.

Project Structure
  
Installation
1. Clone the repository:
git clone <repository-url>
cd <repository-directory>
2. Install the dependencies:
npm install
3. Install Playwright browsers:
npm init playwright@latest
Configuration
1)	The playwright.config.ts file is a configuration file for Playwright, a Node.js library for browser automation. This file is used to define various settings and options for running Playwright tests. Here is an explanation of its significance and common configurations:
We can seet the different browser name to run the test cases.  For example `chromium`, `firefox`, `webkit`.
 browserName: 'chromium',
// Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
channel: 'chrome',
// Run browser in headless mode.
headless: false,
2)	The configuration for the tests is stored in configuration.json. This file includes details such as the URL, username, and password for the application.
Example: configuration.json
{
  "url": "https://www.saucedemo.com/",
  "username": "standard_user",
  "password": "secret_sauce"
}

Running Tests
To run the tests, use the following command:
npx playwright test
This will execute all the tests defined in the tests directory.

Viewing Reports
After running the tests, a report will be generated in the playwright-report directory. To view the report, open the `index.html` file in a web browser:
open playwright-report/index.html
Alternative way – Run the below command from your terminal
npx playwright show-report 
Key Components
App
Handles the application startup and validation of the application title.
import { Page, expect } from '@playwright/test';
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';
export class App {
    private page: Page;
    private apptitle: string = 'Swag Labs';
    constructor(page: Page) {
        this.page = page;
    }
private async validateAppTitle(): Promise<void> {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(this.apptitle);
        ScreenshotService.takeScreenshot(this.page, 'ProductCheckoutTest', 'AppTitle');
 }

    async startApplication(app

url

: string): Promise<void> {
        await this.page.goto(appurl);
        await this.validateAppTitle();
    }
}
```

### Logout
Handles the logout functionality.
```ts
import { Page, expect } from '@playwright/test';
import ScreenshotService from '../Services/TakeScreenshots/ScreenshotService';

export class Logout {
    private logoutButton: string = '[data-test="logout-sidebar-link"]';
    private openMenuButton: string = 'Open Menu';
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
```

### Config
Loads the configuration data from the 

configuration.json

 file.
```ts
import * as fs from 'fs';
import * as path from 'path';

interface ConfigData {
  url: string;
  username: string;
  password: string;
}

class Config {
  private configData: ConfigData;

  constructor() {
    this.configData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../Configuration/configuration.json'), 'utf-8'));
  }

  get url(): string {
    return this.configData.url;
  }

  get username(): string {
    return this.configData.username;
  }

  get password(): string {
    return this.configData.password;
  }
}

const config: Config = new Config();
export default config;
```

### ScreenshotService
Handles taking screenshots during the tests.
```ts
import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

class ScreenshotService {
  static async takeScreenshot(page: Page, testName: string, fileName: string): Promise<void> {
    const date = new Date().toISOString().split('T')[0];
    const dirPath = path.join('screenshots', date, testName);

    fs.mkdirSync(dirPath, { recursive: true });

    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const dateTime = `${date}_${time.replace(/:/g, '-')}`;

    const filePath = path.join(dirPath, `${fileName}-${dateTime}.png`);
    await page.screenshot({ path: filePath });
  }
}

export default ScreenshotService;
```

### ProductCheckoutTest
Defines the test for the product checkout process.
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './LibraryFunctions/LoginPage';
import { Catalog } from './LibraryFunctions/AddProductToCatalog';
import { ProductCheckout } from './LibraryFunctions/ProductCheckout';
import { Logout } from './LibraryFunctions/Logout';
import { App } from './LibraryFunctions/App';
import { CustomerInfo } from './TestData/CustomerInfo';
import config from '../tests/Configuration/Config';
import ScreenshotService from './Services/TakeScreenshots/ScreenshotService';

test.describe('Product Checkout Process:', () => {
  test.beforeEach(async ({ page }) => {
    const app = new App(page);
    await app.startApplication(config.url);

    const loginPage = new LoginPage(page);
    await loginPage.login(config.username, config.password);
    await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'SuccessfullLogin');
  });

  test('Add random products to catalog for checkout Test', async ({ page }) => {
    const addProductToCatalog = new Catalog(page);
    await addProductToCatalog.addProductToCatalog();
    await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'AddProductToCatalog');

    const productCheckout = new ProductCheckout(page);
    const customerInfo: CustomerInfo = new CustomerInfo();
    await productCheckout.checkoutProduct(customerInfo);
    await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'CheckoutProduct');

    const ordersuccessmsg: string = 'Thank you for your order!';
    const message = await page.locator('[data-test="complete-header"]').textContent();
    expect(message).toBe(ordersuccessmsg);
    await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'OrderSuccess');

    await page.locator('[data-test="back-to-products"]').click();
  });

  test.afterEach(async ({ page }) => {
    const logout = new Logout(page);
    await logout.logout();
    await ScreenshotService.takeScreenshot(page, 'ProductCheckoutTest', 'Logout');
  });
});
```

## GitHub Actions
The project uses GitHub Actions to run the tests on every push and pull request to the `main` and `master` branches. The workflow is defined in 

playwright.yml

.

Example workflow:
```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

This documentation should help you understand the project structure, how to set it up, run tests, and view reports.

import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
/*
class ScreenshotService {
  static async takeScreenshot(page: Page, fileName: string): Promise<void> {
    const filePath = `screenshots/${fileName}-${Date.now()}.png`;
    await page.screenshot({ path: filePath });
  }
}
export default ScreenshotService;
*/
class ScreenshotService {
  static async takeScreenshot(page: Page, testName: string, fileName: string): Promise<void> {
    
    const date = new Date().toISOString().split('T')[0];
    const dirPath = path.join('screenshots', date, testName);

    // Ensure the directory exists
    fs.mkdirSync(dirPath, { recursive: true });

    const now = new Date();
    const time = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const dateTime = `${date}_${time.replace(/:/g, '-')}`; // YYYY-MM-DD_HH-MM-SS

    const filePath = path.join(dirPath, `${fileName}-${dateTime}.png`);
    await page.screenshot({ path: filePath });
  }
}

export default ScreenshotService;
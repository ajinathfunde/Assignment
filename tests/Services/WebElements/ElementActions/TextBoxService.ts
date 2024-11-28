import { Locator } from '@playwright/test';

export class TextBoxService {
    
  async clearText(locator: Locator): Promise<void> {
    if (locator) {
      await locator.fill('');
    } else {
      throw new Error('Locator is null');
    }
  }

  async getText(locator: Locator): Promise<string | null> {
    if (locator) {
      return await locator.textContent();
    }
    return null;
  }

  async isDisabled(locator: Locator): Promise<boolean> {
    if (locator) {
      return await locator.isDisabled();
    }
    return false;
  }

  async setTextAsync(locator: Locator, text: string): Promise<void> {
    try {
      if (locator) {
        await locator.fill(text);
      } else {
        throw new Error('Locator is null');
      }
    } catch (e) {
      throw new Error(`Failed to set text on element: ${e.message}`);
    }
  }
}
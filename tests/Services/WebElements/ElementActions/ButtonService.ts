import { Locator } from '@playwright/test';
import { IButton } from '../Interfaces/IButton';

export class ButtonService implements IButton {
  async clickAsync(locator: Locator): Promise<void> {
    if (locator) {
      try {
        await locator.click();
      } catch (e) {
        throw new Error(`Error in clicking the button: ${e.message}`);
      }
    } else {
      throw new Error('Locator is null');
    }
  }

  async isDisabledAsync(locator: Locator): Promise<boolean> {
    if (locator) {
      try {
        return await locator.isDisabled();
      } catch (e) {
        throw new Error(`Error in checking if the button is disabled: ${e.message}`);
      }
    } else {
      throw new Error('Locator is null');
    }
  }

  async isEnabledAsync(locator: Locator): Promise<boolean> {
    if (locator) {
      try {
        return await locator.isEnabled();
      } catch (e) {
        throw new Error(`Error in checking if the button is enabled: ${e.message}`);
      }
    } else {
      throw new Error('Locator is null');
    }
  }
}
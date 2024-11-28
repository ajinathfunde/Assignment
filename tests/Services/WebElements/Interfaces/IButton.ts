import { Locator } from '@playwright/test';

export interface IButton {
  clickAsync(locator: Locator): Promise<void>;
  isDisabledAsync(locator: Locator): Promise<boolean>;
  isEnabledAsync(locator: Locator): Promise<boolean>;
}
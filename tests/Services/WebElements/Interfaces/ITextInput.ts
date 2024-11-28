import { Locator } from '@playwright/test';

export interface ITextInput {
  setTextAsync(locator: Locator, text: string): Promise<void>;
  getText(locator: Locator): Promise<string | null>;
  clearText(locator: Locator): Promise<void>;
  isDisabled(locator: Locator): Promise<boolean>;
}
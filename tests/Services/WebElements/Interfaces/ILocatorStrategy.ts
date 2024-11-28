import { Page, Locator } from '@playwright/test';

export interface ILocatorStrategy {
  getLocator(page: Page, identifierValue: string): Locator;
}
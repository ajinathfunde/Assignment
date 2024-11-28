import { Page, Locator } from '@playwright/test';
import { ILocatorStrategy } from '../Interfaces/ILocatorStrategy';

export class LocatorStrategy implements ILocatorStrategy {
  getLocator(page: Page, identifierValue: string): Locator {
    return page.locator(identifierValue);
  }
}
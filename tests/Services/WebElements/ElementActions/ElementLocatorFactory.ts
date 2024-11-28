import { Page, Locator } from '@playwright/test';
import { ILocatorStrategy } from '../Interfaces/ILocatorStrategy';
import { GetByLocator } from '..//Locators/GetByLocator';


export class ElementLocatorFactory {
  public static getStrategy(page: Page, identifierType: string, identifierValue: string): Locator {
    switch (identifierType) 
    {
      case 'GetByLocator':
        return new GetByLocator().getLocator(page, identifierValue);
      default:
        return new GetByLocator().getLocator(page, identifierValue);
    }
  }
}
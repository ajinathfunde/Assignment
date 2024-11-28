import { expect, Page } from "@playwright/test";

export class Catalog {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
    private product1:string = '[data-test="add-to-cart-sauce-labs-backpack"]';
    private product2:string = '[data-test="add-to-cart-sauce-labs-bike-light"]';
    private product3:string = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]';
    private shoppingCart:string = '[data-test="shopping-cart-link"]';
    private checkout:string = '[data-test="checkout"]';

    async selectingRandomThreeProduct(): Promise<void> {
        console.log("Adding random three product to catalog");
        await this.page.locator(this.product1).click();
        await this.page.locator(this.product2).click();
        await this.page.locator(this.product3).click();
        await this.page.locator(this.shoppingCart).click();
        console.log("Product added to the catalog successfully");

    }

    public async validateCartCount() {

        console.log("Validating the no of product added to the catalog");
        const cartCount = await this.page.locator('[data-test="shopping-cart-badge"]').textContent();
        expect(cartCount).toBe('3');
        console.log("No of product added to the cart is : "+cartCount);

        if(cartCount !== '3') {
            throw new Error("Product count is not matching");
        }
        //now click on checkout button
        console.log("Product count is matching, Now we are good to checkout the product");
        await this.page.locator(this.checkout).click();

    }
    public async addProductToCatalog() {
        // Select random product
       await this.selectingRandomThreeProduct();

       //validate no of product added to the cart
       await this.validateCartCount();
    }
}
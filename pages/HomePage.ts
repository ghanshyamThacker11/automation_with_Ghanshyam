import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    
    async open(url: string) {
        await this.goto(url);
    }

    async openShoppingCategories() {
        await this.page.locator('#cate_head div').filter({ hasText: 'Shopping Categories' }).click();
    }

    async hoverMobiles() {
        await this.page.locator('#mainMenuContent').getByRole('link', { name: 'Mobiles' }).hover();
    }

    async clickSmartphones() {
        await this.page.locator('#mainMenuContent').getByRole('link', { name: 'Smartphones' }).click();
    }

    async setSortBy(option: string) {
        await this.page.locator('#sortByFilter').click(); await this.selectOption('#sortByFilter', option);
    }

    async openProductPopup(productName: string) {
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: productName }).first().click();
        const popup = await popupPromise;
        return popup;
    }
}

import { Page, expect } from '@playwright/test';


export class HomePage {
    public page: Page;
    public logo;
    public loginLink;
    public sellerLink;
    public searchInput;
    public categoryItems;
    public appLink;

    constructor(page: Page) {
        this.page = page;

        this.logo = page.locator('img[title="Online Shopping in India"]').nth(1);
        this.loginLink = page.locator('a', { hasText: 'Log In / Register' });
        this.sellerLink = page.getByRole('link', { name: 'Become a Seller', exact: true });
        this.searchInput = page.locator('#header_search_text');
        this.categoryItems = page.locator('#mainMenuContent a');
        this.appLink = page.locator('a[href="/mobile-apps.html"]').first();
    }

    async visit() {
        await this.page.goto('https://www.naaptol.com/');
    }

    async verifyHomepage() {
        await expect(this.page).toHaveTitle(/Online Shopping India/);
        await expect(this.page).toHaveURL('https://www.naaptol.com/');
        await expect(this.logo).toBeVisible();
        await expect(this.loginLink).toBeVisible();
        await expect(this.sellerLink).toBeVisible();
        await expect(this.searchInput).toHaveValue('');
        await expect(this.categoryItems).not.toHaveCount(0);
        await expect(this.appLink).toHaveAttribute('href', '/mobile-apps.html');
    }

    async search(text: string) {
        await this.searchInput.fill(text);
    }

    async verifySearchValue(text: string) {
        await expect(this.searchInput).toHaveValue(text);
    }

    async takeScreenshots() {
        await this.page.screenshot({
            path: 'screenshots/homepage-full.png',
            fullPage: true,
        });

        await this.page.screenshot({
            path: 'screenshots/homepage-viewport.png',
        });

        await this.logo.screenshot({
            path: 'screenshots/logo.png',
        });

        await this.page.screenshot({
            path: 'screenshots/header.png',
            clip: {
                x: 0,
                y: 0,
                width: 1280,
                height: 120,
            },
        });
    }
}
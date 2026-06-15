import { Page } from '@playwright/test';

export class FeedbackPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.naaptol.com/');
    }

    async openFeedback() {
        await this.page.locator('a').filter({ hasText: 'Feedback' }).click();
    }

    async openGeneralFeedback() {
        await this.page.locator('span').filter({ hasText: 'General Feedback' }).click();
    }

    async fillFirstName(name: string) {
        await this.page.locator('#firstNameFeedback').fill(name);
    }

    async fillLastName(name: string) {
        await this.page.locator('#lastNameFeedback').fill(name);
    }

    async fillEmail(email: string) {
        await this.page.locator('#emailIdFeedback').fill(email);
    }

    async fillPhone(phone: string) {
        await this.page.locator('#phoneFeedback').fill(phone);
    }

    async selectAbout(option: string) {
        await this.page.locator('#aboutNaaptolId').selectOption(option);
    }

    async selectPurpose(label: string) {
        await this.page.locator('#purposeShopId').selectOption({ label });
    }

    async setOverallRating(ratingId: string) {
        await this.page.locator(ratingId).click();
    }

    async selectCompareFeature(value: string) {
        await this.page.locator('#compareFeatureId').selectOption(value);
    }

    async submit() {
        await this.page.getByRole('link', { name: 'Submit' }).click();
    }
}
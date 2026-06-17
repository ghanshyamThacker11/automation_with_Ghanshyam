import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillPaymentDetails(
        nameOnCard: string,
        cardNumber: string,
        cvc: string,
        expMonth: string,
        expYear: string
    ) {
        await this.page.locator('input[name="name_on_card"]').fill(nameOnCard);
        await this.page.locator('input[name="card_number"]').fill(cardNumber);
        await this.page.getByRole('textbox', { name: 'ex.' }).fill(cvc);
        await this.page.getByRole('textbox', { name: 'MM' }).fill(expMonth);
        await this.page.getByRole('textbox', { name: 'YYYY' }).fill(expYear);
    }

    async payAndConfirmOrder() {
        await this.page.getByRole('button', {
            name: 'Pay and Confirm Order'
        }).click();

        await this.page.getByText('ORDER PLACED!').waitFor({
            timeout: 60000
        });
    }

    async continueShopping() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
}
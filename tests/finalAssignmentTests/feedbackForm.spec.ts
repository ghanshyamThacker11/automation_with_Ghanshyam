import { test, expect } from '@playwright/test';
import { FeedbackPage } from '../../pages/FeedbackPage';
import feedbackData from '../../data/feedback.json';

let feedback: FeedbackPage;

test.beforeEach(async ({ page }) => {
  feedback = new FeedbackPage(page);
  await feedback.open();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({
      path: `test-results/${testInfo.title.replace(/\s+/g, '_')}.png`,
      fullPage: true,
    });
  }
});

test('Feedback flow', async ({ page }) => {
  await feedback.openFeedback();
  await feedback.openGeneralFeedback();

  await feedback.fillFirstName(feedbackData.firstName);
  await feedback.fillLastName(feedbackData.lastName);

  await feedback.fillEmail(feedbackData.email);
  await feedback.fillPhone(feedbackData.phone);

  await feedback.selectAbout(feedbackData.about);
  await feedback.selectPurpose(feedbackData.purpose);
  await feedback.setOverallRating(feedbackData.overallRatingId);
  await feedback.selectCompareFeature(feedbackData.compareFeature);

  await feedback.submit();
});
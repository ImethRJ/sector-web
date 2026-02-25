import { test, expect } from '@playwright/test';

test.describe('Critical Paths', () => {
    test('landing page should load branding elements', async ({ page }) => {
        await page.goto('/');

        // Check main branding logo and text
        await expect(page.getByTestId('site-logo')).toBeVisible();
        await expect(page.getByTestId('site-logo')).toContainText('SECTOR');

        // Check main hero title
        await expect(page.locator('h1')).toContainText('Empowering Minds');
    });

    test('contact modal should open and close', async ({ page }) => {
        await page.goto('/');

        // Check hero contact button
        const contactBtn = page.getByTestId('hero-contact-button');
        await expect(contactBtn).toBeVisible();

        // Click button to open modal
        await contactBtn.click();

        // Check if modal appears
        await expect(page.getByTestId('contact-modal')).toBeVisible();
        await expect(page.locator('text=Connect With Us')).toBeVisible();

        // Close modal
        await page.getByTestId('close-modal-button').click();

        // Check if modal is gone
        await expect(page.getByTestId('contact-modal')).not.toBeVisible();
    });

    test('navigation between main routes should work', async ({ page }) => {
        await page.goto('/');

        // Mock the hash links/scrolling behavior isn't easy to test without visual check, 
        // but we can test navigation to real pages.

        // Navigate to All Tutors page
        await page.goto('/all-tutors');
        await expect(page.url()).toContain('/all-tutors');
        // Use getByRole for reliable heading selection and update text to match actual content
        await expect(page.getByRole('heading', { level: 2, name: /Our Entire Faculty/i })).toBeVisible();

        // Navigate back home
        await page.goto('/');
        await expect(page.url()).toBe(page.context()._options.baseURL + '/');
    });
});

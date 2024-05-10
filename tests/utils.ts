import { Page } from '@playwright/test';

export const urlApiTestApp = process.env.NEXT_PUBLIC_API_BASE_URL;

export const switchCollection = async (page: Page, collectionId: string) => {
    await page.evaluate(async (collectionId: string) => {
        const response = await fetch('http://localhost:3110/api/config', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mock: {
                    collections: {
                        selected: collectionId,
                    },
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }, collectionId);
};

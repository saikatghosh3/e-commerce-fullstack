import { revalidateTag } from 'next/cache';

export const TAGS = {
  settings: 'site-settings',
  categories: 'categories',
  products: 'products',
  advertisements: 'advertisements',
};

/**
 * Must be called after any write that changes cached data, otherwise the admin
 * panel appears to save successfully while the storefront keeps serving the
 * previous value until the revalidation window expires.
 */
export function invalidate(...tags) {
  for (const tag of tags) {
    try {
      revalidateTag(tag);
    } catch (error) {
      console.error(`Failed to revalidate tag "${tag}":`, error);
    }
  }
}

export const invalidateProducts = () => invalidate(TAGS.products, TAGS.categories);
export const invalidateCategories = () => invalidate(TAGS.categories);
export const invalidateSettings = () => invalidate(TAGS.settings);
export const invalidateAdvertisements = () => invalidate(TAGS.advertisements);

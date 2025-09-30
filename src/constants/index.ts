export const MAX_COMPARISON_PRODUCTS = 3;
export const MIN_COMPARISON_PRODUCTS = 2;

export const MAX_SEARCH_LENGTH = 100;
export const SEARCH_DEBOUNCE_MS = 300;

export const NOTIFICATION_DURATION = 6000;
export const IMAGE_LOADING_TIMEOUT = 10000;

export const STORAGE_KEYS = {
  COMPARISON_LIST: 'compareList',
  DARK_MODE: 'darkMode',
  USER_PREFERENCES: 'userPreferences'
} as const;

export const ARIA_LABELS = {
  SEARCH_INPUT: 'Search products, brands, or features',
  BRAND_FILTER: 'Filter by brand',
  CLEAR_SEARCH: 'Clear search',
  CLEAR_FILTERS: 'Clear all filters',
  THEME_TOGGLE: 'Toggle theme mode',
  SKIP_TO_CONTENT: 'Skip to main content'
} as const;

export const PRODUCT_RATING = {
  MAX_STARS: 5,
  DEFAULT_RATING: 4.5,
  STAR_COLOR: '#FBBF24'
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536
} as const;
export const ERROR_MESSAGES = {
  INVALID_PRODUCT: 'Invalid product data',
  COMPARISON_FULL: 'Cannot add more products. Maximum 3 products can be compared at once.',
  STORAGE_ERROR: 'Failed to save data. Please try again.',
  IMAGE_LOAD_ERROR: 'Failed to load product image',
  NETWORK_ERROR: 'Network error. Please check your connection.'
} as const;


export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added to comparison',
  PRODUCT_REMOVED: 'Product removed from comparison',
  FILTERS_CLEARED: 'All filters cleared',
  COMPARISON_CLEARED: 'Comparison cleared'
} as const;
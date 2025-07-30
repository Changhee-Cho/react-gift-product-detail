const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY_PAGE: '/my',
  ORDER_DETAIL_BASE: '/order/:productId',
  NOT_FOUND: '*',
  THEME_PAGE: '/themes/:themeId',
  PRODUCT_PAGE: '/product/:productId',
} as const;

export const getThemePagePath = (themeId: string) => `/themes/${themeId}`;
export const getOrderDetailPath = (productId: number | string) =>
  `/order/${productId}`;

export default ROUTES;

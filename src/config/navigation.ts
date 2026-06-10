import { Feather } from '@expo/vector-icons';

export type AppRoute = '/' | '/sales' | '/inventory' | '/menu' | '/finances' | '/more';

export type NavigationItem = {
  href: AppRoute;
  icon: keyof typeof Feather.glyphMap;
  labelKey: string;
};

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    icon: 'home',
    labelKey: 'navigation.home',
  },
  {
    href: '/sales',
    icon: 'shopping-bag',
    labelKey: 'navigation.sales',
  },
  {
    href: '/inventory',
    icon: 'archive',
    labelKey: 'navigation.inventory',
  },
  {
    href: '/menu',
    icon: 'coffee',
    labelKey: 'navigation.menu',
  },
  {
    href: '/finances',
    icon: 'bar-chart-2',
    labelKey: 'navigation.finances',
  },
  {
    href: '/more',
    icon: 'more-horizontal',
    labelKey: 'navigation.more',
  },
];

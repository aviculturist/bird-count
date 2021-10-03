import { atom } from 'jotai';

export const SUPPORTED_LOCALES = ['en', 'it', 'ru'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const userLocaleAtom = atom(<Locale | null>(null));
export { messages as DEFAULT_MESSAGES } from '../../locale/en'

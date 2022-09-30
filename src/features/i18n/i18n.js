import getDictionaries from './index'

export const i18n = (str) => {
  if (str) {
    return getDictionaries().enUS[str] || str
  }
}
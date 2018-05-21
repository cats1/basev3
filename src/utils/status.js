import i18n from '@/lang'
import {getLanguage} from '@/utils/i18n'
export function checkSignType (value) {
  switch (value) {
    case 0:
      return i18n.messages[getLanguage()].status.off
    case 1:
      return i18n.messages[getLanguage()].status.on
    default:
      return i18n.messages[getLanguage()].status.on
  }
}
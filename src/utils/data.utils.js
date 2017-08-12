import { tempData } from '../TempData'
import titleCase from 'title-case'

export const messageTypesSecondaryMenuData = () => tempData().messageTypes.map((messageType) => ({name: `${titleCase(messageType.verboseName.replace(/_/g,' '))}`}))

export const DefaultMessageTypeForMenu = () => messageTypesSecondaryMenuData().find((msgType, idx) => idx === 0)
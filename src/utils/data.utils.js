import { tempData } from '../TempData'
import titleCase from 'title-case'

export const entitiesData = () => tempData().entities

export const messageTypeData = () => tempData().messageTypes

export const messageSubscribersData = () => tempData().subscriptions

export const messageTypesSecondaryMenuData = () => tempData().messageTypes.map((messageType) => ({name: `${titleCase(messageType.verboseName.replace(/_/g,' '))}`}))

export const entitiesSecondaryMenuData = () => tempData().entities.map((entity) => ({name: entity.name}))

export const getEntityObj = (name) => entitiesData().find((entity) => entity.name === name)

export const getMessageTypeObj = (name) => messageTypeData().find((msgType) => msgType.verboseName === name.toUpperCase().replace(/ /g, '_'))

export const DefaultMessageTypeForMenu = () => messageTypesSecondaryMenuData().find((msgType, idx) => idx === 0)

export const DefaultEntityForMenu = () => entitiesSecondaryMenuData().find((entity, idx) => idx === 0)


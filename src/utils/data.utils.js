import titleCase from 'title-case'
import axios from 'axios'
import { config } from './config.util'

const ROOT_URL = config.apiAddress

export const getData = async (context) => {
    const endPoint = `${ROOT_URL}/${context}`
    let contextData = JSON.parse(localStorage.getItem(context))
    if(!contextData){
        const { data } = await axios.get(endPoint)
        contextData = data
        localStorage.setItem(context, JSON.stringify(contextData))
    }
    return contextData
}

export const getLogs = async (page) => {
    const endPoint = `${ROOT_URL}/logs/${page}`
    const { data } = await axios.get(endPoint)
    return data
}

export const getToggledLogs = async (level, page) => {
    const endPoint = `${ROOT_URL}/logs/level/${level}/${page}`
    const { data } = await axios.get(endPoint)
    return data
}

export const getSearchedLogs = async (searchTerm, page) => {
    const endPoint = `${ROOT_URL}/logs/search/${searchTerm}/${page}`
    const { data } = await axios.get(endPoint)
    return data
}

export const getLogsCount = async () => {
    const endPoint = `${ROOT_URL}/logs/count`
    const data = await axios.get(endPoint)
    console.log(data)
    return data
}

export const saveSubscription = async (subscription) => {
    const url = `${ROOT_URL}/subscribers`
    const method = 'post'
    const { data } = await axios({ method , url, data: subscription })
    return data
}

export const deleteSubscription = (messageTypeId, entityId) => {
    const url = `${ROOT_URL}/subscribers/${entityId}/${messageTypeId}`
    return axios.delete(url)
}

export const getContextData = (context) => JSON.parse(localStorage.getItem(context))

export const addSubscription = async (messageType, entity) => {
    const postData = { EntityId: getEntityObj(entity).id, MessageTypeId: getMessageTypeObj(messageType).id }
    await saveSubscription(postData)
    localStorage.removeItem('subscribers')
    const subscriptions = await getData('subscribers')
    return subscriptions
}

export const updateEntity = async (entity) => {
    const url = `${ROOT_URL}/entities/${entity.id}`
    const data =  await axios.put(url, entity)
    localStorage.removeItem('entities')
    await getData('entities')
    return data
}

export const removeSubscription = async (messageTypeName, entityName) => {
    const entity = getEntityObj(entityName)
    const messageType = getMessageTypeObj(messageTypeName)
    await deleteSubscription(messageType.id, entity.id)
    localStorage.removeItem('subscribers')
    const subscribers = await getData('subscribers')
    return subscribers
}

export const messageTypesSubscribedTo = (entity) => {
    const entitysubscriptions = getContextData('entitysubscriptions')
    const messageTypeSubscribers = entitysubscriptions.find(subscriber => {
        return subscriber.entity === entity
    })
    const messageTypes = messageTypeSubscribers.messageTypes.map(messageType => {
        const messageTypeObj = getMessageTypeObj(messageType)
        const newMessageType = Object.assign(
            {},
            messageTypeObj,
            {
                name: titleCase(messageTypeObj.verboseName.replace(/_/g, ' ')),
                editLink: `/Participating-Systems/${entity}/Subscription/${messageType}/Unsubscribe`
            }
        )
        return newMessageType
    })
    return messageTypes
}

export const entitiesSubscribedTo = (messageType) => {
    const subscribers = getContextData('subscribers')
    const messageTypeSubscribers = subscribers.find(subscriber => {
        return subscriber.messageType === messageType
    })
    console.log('messageTypeSubscribers', messageTypeSubscribers)
    const entities = messageTypeSubscribers.subscribers.map(subscriber => {
        const newEntity = Object.assign({}, getEntityObj(subscriber.name), {editLink: `/Message-Type/${messageType}/Subscription/${subscriber}/Unsubscribe`})
        return newEntity
    })
    return entities
}

export const messageTypesSecondaryMenuData = () => getContextData('messagetypes').map((messageType) => ({name: `${titleCase(messageType.verboseName.replace(/_/g,' '))}`}))

export const entitiesSecondaryMenuData = () => getContextData('entities').map((entity) => ({name: entity.name}))

export const getEntityObj = (name) => getContextData('entities').find((entity) => entity.name === name)

export const getMessageTypeObj = (name) => getContextData('messagetypes').find((msgType) => msgType.verboseName === name.toUpperCase().replace(/ /g, '_'))

export const DefaultMessageTypeForMenu = () => messageTypesSecondaryMenuData().find((msgType, idx) => idx === 0)

export const DefaultEntityForMenu = () => entitiesSecondaryMenuData().find((entity, idx) => idx === 0)

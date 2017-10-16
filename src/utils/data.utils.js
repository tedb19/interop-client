import titleCase from 'title-case'
import axios from 'axios'

const IP_ADDRESS = window.location.href.split(':')[1].replace(/\/\//g, '')
const ROOT_URL = `http://${IP_ADDRESS}:3003`

const expiryTime = () => {
    const currentTime = new Date()
    let setTime = localStorage.getItem('setTime')
    let verdict = false
    if(setTime) {
        const setTime = new Date(localStorage.getItem('setTime'))
        const milisecs = currentTime - setTime
        const minutes = Math.round(((milisecs % 86400000) % 3600000) / 60000)
        verdict = (minutes > 0.2) ? true : false
        if(verdict) localStorage.setItem('setTime', new Date().toString())
    } else {
        localStorage.setItem('setTime', new Date().toString())
        verdict = false
    }
    return verdict
}

export const getData = async (context) => {
    const endPoint = `${ROOT_URL}/${context}`
    let contextData = JSON.parse(localStorage.getItem(context))
    const isExpired = expiryTime()
    if(!contextData || isExpired){
        console.log('fetching new data..')
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

export const getStats = async () => {
    const endPoint = `${ROOT_URL}/stats/`
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
    return data
}

export const saveSubscription = async (subscription) => {
    const url = `${ROOT_URL}/subscribers`
    const method = 'post'
    const { data } = await axios({ method , url, data: subscription })
    return data
}

export const saveMessageType = async (messageType) => {
    const url = `${ROOT_URL}/messagetypes`
    const method = 'post'
    const { data } = await axios({ method , url, data: messageType })
    return data
}

export const saveAddress = async (address) => {
    const url = `${ROOT_URL}/addresses`
    const method = 'post'
    await axios({ method , url, data: address })
    localStorage.removeItem('entities')
    const entities = await getData('entities')
    return entities
}

export const deleteAddress = (entityId) => {
    const url = `${ROOT_URL}/addresses/${entityId}`
    return axios.delete(url)
}


export const addMessageType = async (messageType) => {
    await saveMessageType(messageType)
    localStorage.removeItem('messagetypes')
    localStorage.removeItem('subscribers')
    const data = await Promise.all([getData('subscribers'), getData('messagetypes')])
    return data
}

export const saveEntity = async (entity) => {
    const url = `${ROOT_URL}/entities`
    const method = 'post'
    const { data } = await axios({ method , url, data: entity })
    return data
}

export const addEntity = async (entity) => {
    await saveEntity(entity)
    localStorage.removeItem('entities')
    localStorage.removeItem('subscribers')
    const data = await Promise.all([getData('subscribers'), getData('entities')])
    return data
}

export const saveStat = async (stat) => {
    const url = `${ROOT_URL}/stats/`
    const method = 'post'
    const { data } = await axios({ method , url, data: stat })
    return data
}

export const deleteSubscription = (messageTypeId, entityId) => {
    const url = `${ROOT_URL}/subscribers/${entityId}/${messageTypeId}`
    return axios.delete(url)
}

export const getContextData = (context) => JSON.parse(localStorage.getItem(context))

export const addSubscription = async (messageTypeName, entityName) => {
    const [ entity, messageType ] = await Promise.all(
        [getEntityObj(entityName), getMessageTypeObj(messageTypeName)]
    )
    const postData = { EntityId: entity.id, MessageTypeId: messageType.id }
    await saveSubscription(postData)
    localStorage.removeItem('subscribers')
    const subscriptions = await getData('subscribers')
    return subscriptions
}

export const updateEntity = async (entity) => {
    const url = `${ROOT_URL}/entities/${entity.id}`
    await axios.put(url, entity)
    await localStorage.removeItem('entities')
    const entities = await getData('entities')
    return entities
}

export const removeSubscription = async (messageTypeName, entityName) => {
    const [ entity, messageType ] = await Promise.all(
        [getEntityObj(entityName), getMessageTypeObj(messageTypeName)]
    )
    await deleteSubscription(messageType.id, entity.id)
    localStorage.removeItem('subscribers')
    const subscribers = await getData('subscribers')
    return subscribers
}

export const messageTypesSubscribedTo = async (entity) => {
    const entitysubscriptions = await getData('entitysubscriptions')
    const messageTypeSubscribers = entitysubscriptions.find(subscriber => {
        return subscriber.entity === entity
    })
    
    if(!messageTypeSubscribers) return []
    let messageTypes = []
    for(let messageType of messageTypeSubscribers.messageTypes) {
        const messageTypeObj = await getMessageTypeObj(messageType)
        const newMessageType = Object.assign(
            {},
            messageTypeObj,
            {
                name: titleCase(messageTypeObj.verboseName.replace(/_/g, ' ')),
                editLink: `/Participating-Systems/${entity}/Subscription/${messageType}/Unsubscribe`
            }
        )
        messageTypes.push(newMessageType)
    }
    return messageTypes
}

export const entitiesSubscribedTo = async (messageType) => {
    const subscribers = await getData('subscribers')
    const messageTypeSubscribers = subscribers.find(subscriber => {
        return subscriber.messageType === messageType.replace(/ /g, '_').toUpperCase()
    })
    if(!messageTypeSubscribers) return []
    let entities = []
    for(let subscriber of messageTypeSubscribers.subscribers){
        const entity = await getEntityObj(subscriber.name)
        const newEntity = Object.assign(
            {}, 
            entity,
            {editLink: `/Message-Type/${messageType}/Subscription/${subscriber}/Unsubscribe`}
        )
        entities.push(newEntity)
    }
    return entities
}

export const messageTypesSecondaryMenuData = async () => {
    const messagetypes = await getData('messagetypes')
    return messagetypes.map((messageType) => ({
        name: `${titleCase(messageType.verboseName.replace(/_/g,' '))}`
    }))
}

export const entitiesSecondaryMenuData = async () => {
    const entities = await getData('entities')
    return entities.map((entity) => ({
        name: entity.name
    }))
}

export const getEntityObj = async (name) => {
    const entities = await getData('entities')
    return entities.find((entity) => entity.name === name)
}

export const getEntityColors = async () => {
    const entities = await getData('entities')
    return entities.map((entity) => entity.color)
}

export const getMessageTypeObj = async (name) => {
    const messagetypes = await getData('messagetypes')
    const newName = name ? name.toUpperCase().replace(/ /g, '_') : ''
    return messagetypes.find((msgType) => 
        msgType.verboseName === newName
    )
}

export const DefaultMessageTypeForMenu = async () => {
    const secMenuData = await messageTypesSecondaryMenuData()
    return secMenuData.find((msgType, idx) => idx === 0)
}

export const DefaultEntityForMenu = async () => {
    const secMenuData = await entitiesSecondaryMenuData()
    return secMenuData.find((entity, idx) => idx === 0)
}


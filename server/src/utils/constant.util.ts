export const API_PREFIX = '/api/v1/trello'
export const HOST = 'http://localhost'

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/

export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'

export const WHITELISTED_ORIGINS = ['http://localhost:5173']

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

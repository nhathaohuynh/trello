import { API_PREFIX } from '~/utils/constant.util'

export const ROUTE_APP = {
  users: {
    path: '/users',
    child: {
      signIn: {
        path: '/sign-in',
        method: 'POST'
      },

      verify: {
        path: '/verify',
        method: 'POST'
      },

      signUp: {
        path: '/sign-up',
        method: 'POST'
      },

      refreshToken: {
        path: '/refresh-token',
        method: 'GET'
      },

      logout: {
        path: '/log-out',
        method: 'DELETE'
      },

      updatePassword: {
        path: '/update-password',
        method: 'PUT'
      },

      updateInformation: {
        path: '/update-information',
        method: 'PUT'
      },

      forgotPassword: {
        path: '/forgot-password',
        method: 'POST'
      }
    }
  },

  boards: {
    path: '/boards',
    child: {
      create: {
        path: '',
        method: 'POST'
      },
      getList: {
        path: '',
        method: 'GET'
      },
      getById: {
        path: '/:id',
        method: 'GET'
      },
      update: {
        path: '/:id',
        method: 'PUT'
      },
      delete: {
        path: '/:id',
        method: 'DELETE'
      }
    }
  },

  Columns: {
    path: '/columns',
    child: {
      create: {
        path: '',
        method: 'POST'
      },
      moveCardBetweenColumns: {
        path: '/move-card-between-columns',
        method: 'PUT'
      },
      getList: {
        path: '',
        method: 'GET'
      },
      getById: {
        path: '/:id',
        method: 'GET'
      },
      update: {
        path: '/:id',
        method: 'PUT'
      },
      delete: {
        path: '/:id',
        method: 'DELETE'
      }
    }
  },

  cards: {
    path: '/cards',
    child: {
      create: {
        path: '',
        method: 'POST'
      },
      getList: {
        path: '',
        method: 'GET'
      },
      getById: {
        path: '/:id',
        method: 'GET'
      },
      update: {
        path: '/:id',
        method: 'PUT'
      },
      delete: {
        path: '/:id',
        method: 'DELETE'
      }
    }
  },

  comments: {
    path: '/comments',
    child: {
      create: {
        path: '',
        method: 'POST'
      },
      getList: {
        path: '',
        method: 'GET'
      },
      getById: {
        path: '/:id',
        method: 'GET'
      },
      update: {
        path: '/:id',
        method: 'PUT'
      },
      delete: {
        path: '/:id',
        method: 'DELETE'
      }
    }
  }
}

export const nameStrateryValidation = {
  ENV_STRATEGY: 'ENV_STRATEGY',
  SIGNIN: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.signIn.path}:${ROUTE_APP.users.child.signIn.method}`,
  SIGNUP: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.signUp.path}:${ROUTE_APP.users.child.signUp.method}`,
  CREATE_BOARD: `${API_PREFIX}${ROUTE_APP.boards.path}${ROUTE_APP.boards.child.create.path}:${ROUTE_APP.boards.child.create.method}`,
  GET_BOARD_BY_ID: `${API_PREFIX}${ROUTE_APP.boards.path}${ROUTE_APP.boards.child.getById.path}:${ROUTE_APP.boards.child.getById.method}`,
  DELETE_BOARD: `${API_PREFIX}${ROUTE_APP.boards.path}${ROUTE_APP.boards.child.delete.path}:${ROUTE_APP.boards.child.delete.method}`,
  UPDATE_BOARD: `${API_PREFIX}${ROUTE_APP.boards.path}${ROUTE_APP.boards.child.update.path}:${ROUTE_APP.boards.child.update.method}`,
  CREATE_COLUMN: `${API_PREFIX}${ROUTE_APP.Columns.path}${ROUTE_APP.Columns.child.create.path}:${ROUTE_APP.Columns.child.create.method}`,
  GET_COLUMN_BY_ID: `${API_PREFIX}${ROUTE_APP.Columns.path}${ROUTE_APP.Columns.child.getById.path}:${ROUTE_APP.Columns.child.getById.method}`,
  DELETE_COLUMN: `${API_PREFIX}${ROUTE_APP.Columns.path}${ROUTE_APP.Columns.child.delete.path}:${ROUTE_APP.Columns.child.delete.method}`,
  UPDATE_COLUMN: `${API_PREFIX}${ROUTE_APP.Columns.path}${ROUTE_APP.Columns.child.update.path}:${ROUTE_APP.Columns.child.update.method}`,
  CREATE_CARD: `${API_PREFIX}${ROUTE_APP.cards.path}${ROUTE_APP.cards.child.create.path}:${ROUTE_APP.cards.child.create.method}`,
  GET_CARD_BY_ID: `${API_PREFIX}${ROUTE_APP.cards.path}${ROUTE_APP.cards.child.getById.path}:${ROUTE_APP.cards.child.getById.method}`,
  DELETE_CARD: `${API_PREFIX}${ROUTE_APP.cards.path}${ROUTE_APP.cards.child.delete.path}:${ROUTE_APP.cards.child.delete.method}`,
  UPDATE_CARD: `${API_PREFIX}${ROUTE_APP.cards.path}${ROUTE_APP.cards.child.update.path}:${ROUTE_APP.cards.child.update.method}`,
  VERIFY_TOKEN: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.verify.path}:${ROUTE_APP.users.child.verify.method}`,
  UPDATE_PASSWORD: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.updatePassword.path}:${ROUTE_APP.users.child.updatePassword.method}`,
  UPDATE_INFORMATION: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.updateInformation.path}:${ROUTE_APP.users.child.updateInformation.method}`,
  FORGOT_PASSWORD: `${API_PREFIX}${ROUTE_APP.users.path}${ROUTE_APP.users.child.forgotPassword.path}:${ROUTE_APP.users.child.forgotPassword.method}`
}

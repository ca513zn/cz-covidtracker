/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  UPDATE_PROFILE
} from 'src/actions/accountActions';

const initialState = {
  user: {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/images/avatars/coronavirus.png',
    bio: 'Sales Manager',
    canHire: false,
    country: 'USA',
    email: 'katarina.smith@devias.io',
    username: 'admin',
    password: 'admin',
    firstName: 'Covid',
    isPublic: true,
    lastName: 'Tracker',
    phone: '+40 777666555',
    role: 'admin',
    state: 'New York',
    timezone: '4:32PM (GMT-4)'
  }
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        draft.user = null;
      });
    }

    case LOGIN_SUCCESS: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case SILENT_LOGIN: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;

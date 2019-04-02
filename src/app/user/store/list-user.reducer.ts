import * as ListUserActions from './list-user.actions';


export interface AppState {
  listUser: State;
}


export interface State {
  users: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
  } [];
}

const INITIAL_STATE: State = {
  users: [
    {
      id: 1,
      firstName: 'Adam',
      lastName: 'Smith',
      email: 'adam@test.com',
    },
    {
      id: 2,
      firstName: 'Frank',
      lastName: 'Smith',
      email: 'frank@test.com',
    }
  ],
};


export function listUserReducer(state = INITIAL_STATE, action: ListUserActions.ListUserActions) {
  switch (action.type) {
    case ListUserActions.ADD_USER:
      const newUserId = state.users[state.users.length - 1].id + 1;
      const newUser = {...action.payload, id: newUserId};
      return {
        ...state,
        users: [...state.users, newUser]
      };
      case ListUserActions.EDIT_USER:
        const users = [...state.users];
        const userIndex = users.findIndex(user => user.id === +action.payload.id);
        users[userIndex] = action.payload;
        return {
          ...state,
          users
        };
    default:
      return state;
  }
}

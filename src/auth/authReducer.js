import { types } from "../types/types";

export const authReducer = (state = {}, action) => {

  switch (action.type) {
    case types.login:
      return {
        email: action.payload.email,
        roles: action.payload.roles,
        logged: true,
        token: action.payload.token
      }
    case types.logout:
      return {
        logged: false
      }

    default:
      return state;

  }
}
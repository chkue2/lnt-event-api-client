import { SocketUserState } from '../model/SocketUserState';
export const DEFAULT_STATE: SocketUserState = {
  state: 'none',
  socketUsers: [],
  socketUserSearch: null,
  errorMessage: '',
  active: false,
};

import { ApiState, Search } from 'src/shared/model';
import { SocketUser } from './SocketUser';

export interface SocketUserState {
  state: ApiState;
  socketUsers: SocketUser[] | null;
  socketUserSearch: Search | null;
  errorMessage: string;
  active: boolean;
}

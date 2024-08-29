import { ApiState } from 'src/shared/model';
import { SocketUser } from './SocketUser';

export interface SocketUserState {
  state: ApiState;
  socketUsers: SocketUser[] | null;
  errorMessage: string;
  active: boolean;
}

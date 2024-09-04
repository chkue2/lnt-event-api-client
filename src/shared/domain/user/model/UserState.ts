import { ApiState, Search } from 'src/shared/model';
import { UserListItem } from './UserListItem';

export interface UserState {
  state: ApiState;
  errorMessage: string;
  active: boolean;
  userList: UserListItem[];
  userListSearch: Search | null;
}

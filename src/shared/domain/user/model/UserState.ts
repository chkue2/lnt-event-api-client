import { ApiState, Search } from 'src/shared/model';
import { UserListItem } from './UserListItem';
import { UserDetailItem } from './UserDetailItem';

export interface UserState {
  state: ApiState;
  errorMessage: string;
  active: boolean;
  userList: UserListItem[];
  userListSearch: Search | null;
  userDetail: UserDetailItem;
}

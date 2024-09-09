import { ApiState, Search } from 'src/shared/model';
import { ConnectionListItem } from './ConnectionListItem';
import { ConenctionUserItem } from './ConnectionUserItem';

export interface ConnectionState {
  state: ApiState;
  errorMessage: string;
  active: boolean;
  connectionList: ConnectionListItem[];
  connectionListSearch: Search | null;
  connectionUser: ConenctionUserItem | null;
  selectedEmail: string;
}

import { defineStore } from 'pinia';
import { Search } from 'src/shared/model';
import {
  ConenctionUserItem,
  ConnectionListItem,
  ConnectionState,
} from 'src/shared/domain/connection';
import { apiService } from 'src/shared/api-service/ApiService';
import { ApiError } from 'src/shared/api-service';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

interface WebConnectionResult {
  search: Search;
  total: number;
  list: ConnectionListItem[];
}

export const useWebConnectionStore = defineStore('webConnection', {
  state: (): ConnectionState => ({
    state: 'none',
    errorMessage: '',
    active: true,
    connectionList: [],
    connectionListSearch: null,
    connectionUser: null,
    selectedEmail: '',
  }),
  getters: {
    getConnectionList: (state) => state.connectionList,
    getConnectionListSearch: (state) => state.connectionListSearch,
    getSelectedEmail: (state) => state.selectedEmail,
    getConnectionUser: (state) => state.connectionUser,
    getActive: (state) => state.active,
  },
  actions: {
    searchConnectionList(searchForm: Search) {
      apiService.getParams<WebConnectionResult>(
        '/web-connection/admin',
        searchForm
      )(
        (respond: WebConnectionResult) => {
          this.state = 'none';
          this.connectionList = respond.list;
          this.connectionListSearch = respond.search;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '접속이력 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchConnectionListAdd(searchForm: Search) {
      apiService.getParams<WebConnectionResult>(
        '/web-connection/admin',
        searchForm
      )(
        (respond: WebConnectionResult) => {
          this.state = 'none';
          this.connectionList?.push(...respond.list);
          this.connectionListSearch = respond.search;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '접속이력 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchConnectionUser() {
      this.active = false;
      apiService.get<ConenctionUserItem>(
        `/web-connection/user/${this.selectedEmail}`
      )(
        (respond: ConenctionUserItem) => {
          this.state = 'none';
          this.connectionUser = respond;
          this.active = true;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '접속이력 에러';
          NotifyUtil.error(this.errorMessage);
          this.active = true;
        }
      );
    },
    setSelectedEmail(email: string) {
      this.selectedEmail = email;
    },
  },
});

import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import { DocumentListItem, DocumentState } from 'src/shared/domain/document';
import { DocumentDetailItem } from 'src/shared/domain/document/model/DocumentDetailItem';
import { Search } from 'src/shared/model';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

interface DocumentListResult {
  search: Search;
  total: number;
  list: DocumentListItem[];
}

interface DocumentDetailResult {
  search: Search;
  total: number;
  list: DocumentDetailItem[];
}

export const useDocumentStore = defineStore('document', {
  state: (): DocumentState => ({
    state: 'none',
    errorMessage: '',
    documentList: [],
    documentListSearch: null,
    documentDetail: [],
    documentDetailSearch: null,
    active: true,
    selectedDocId: '',
  }),
  getters: {
    getDocumentList: (state) => state.documentList,
    getDocumentDetail: (state) => state.documentDetail,
    getDocumentListSearch: (state) => state.documentListSearch,
    getDocumentDetailSearch: (state) => state.documentDetailSearch,
  },
  actions: {
    searchDocumentList(searchForm: Search) {
      apiService.getParams<DocumentListResult>('/document/admin', searchForm)(
        (respond: DocumentListResult) => {
          this.state = 'none';
          this.documentListSearch = respond.search;
          this.documentList = respond.list;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '전문이력 목록 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchDocumentListAdd(searchForm: Search) {
      apiService.getParams<DocumentListResult>('/document/admin', searchForm)(
        (respond: DocumentListResult) => {
          this.state = 'none';
          this.documentListSearch = respond.search;
          this.documentList?.push(...respond.list);
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '전문이력 목록 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchDocumentDetail(searchForm: Search) {
      apiService.getParams<DocumentDetailResult>('/document/history', {
        ...searchForm,
        searchKey: this.selectedDocId,
      })(
        (respond: DocumentDetailResult) => {
          this.state = 'none';
          this.documentDetail = respond.list;
        },
        (apiError?: ApiError) => {
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '전문이력 상세 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchDocumentDetailAdd(searchForm: Search) {
      apiService.getParams<DocumentDetailResult>(
        '/document/history',
        searchForm
      )(
        (respond: DocumentDetailResult) => {
          this.state = 'none';
          this.documentDetailSearch = respond.search;
          this.documentDetail?.push(...respond.list);
        },
        (apiError?: ApiError) => {
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '전문이력 상세 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    setDocId(docId: string) {
      this.selectedDocId = docId;
    },
  },
});

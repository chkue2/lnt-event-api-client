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
    documentData: [],
    active: true,
    selectedDocId: '',
  }),
  getters: {
    getDocumentList: (state) => state.documentList,
    getDocumentListSearch: (state) => state.documentListSearch,
    getDocumentDetail: (state) => state.documentDetail,
    getDocumentDetailSearch: (state) => state.documentDetailSearch,
    getDocumentData: (state) => state.documentData,
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
          this.resetDocumentData();
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
    searchDocumentData(historyId: string) {
      apiService.get<any>(`/document/data/${historyId}`)(
        (respond: any) => {
          this.resetDocumentData();
          if (respond.data_enc === 'JS') {
            try {
              const obj = JSON.parse(respond.data);
              this.documentData = Object.entries(obj).map(([key, value]) => ({
                key,
                value,
              }));
            } catch {
              NotifyUtil.error('비정상적인 데이타');
            }
          }
        },
        (apiError?: ApiError) => {
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '수신 데이타 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    setDocId(docId: string) {
      this.selectedDocId = docId;
    },
    resetDocumentData() {
      this.documentData = [];
    },
  },
});

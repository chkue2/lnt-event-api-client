import { ApiState, Search } from 'src/shared/model';
import { DocumentListItem } from './DocumentListItem';
import { DocumentDetailItem } from './DocumentDetailItem';

export interface DocumentState {
  state: ApiState;
  documentList: DocumentListItem[] | null;
  documentListSearch: Search | null;
  documentDetail: DocumentDetailItem[] | null;
  documentDetailSearch: Search | null;
  errorMessage: string;
  active: boolean;
  selectedDocId: string;
}

import { ApiState } from 'src/shared/model';
import { DocumentListItem } from './DocumentListItem';
import { DocumentDetailItem } from './DocumentDetailItem';

export interface DocumentState {
  state: ApiState;
  documentList: DocumentListItem[] | null;
  documentDetail: DocumentDetailItem[] | null;
  errorMessage: string;
  active: boolean;
  selectedDocId: string;
}

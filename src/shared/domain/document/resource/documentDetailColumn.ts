import { QTableProps } from 'quasar';

export const DOCUMENT_DETAIL_COLUMN: QTableProps['columns'] = [
  {
    name: 'index',
    label: 'No',
    field: 'index',
  },
  {
    name: 'fromDevice',
    required: true,
    label: '송신',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
  {
    name: 'toDevice',
    required: true,
    label: '수신',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
  {
    name: 'scope',
    required: true,
    label: '전문분류',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
  {
    name: 'timeStamp',
    required: true,
    label: '요청일시',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
  {
    name: 'createdAt',
    required: true,
    label: '등록일시',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
  {
    name: 'savedAt',
    required: true,
    label: '서버저장시간',
    align: 'center',
    field: '',
    sortable: false,
    style: 'max-width: 100px',
    headerStyle: 'max-width: 100px',
  },
];

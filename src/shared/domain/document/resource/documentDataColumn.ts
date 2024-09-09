import { QTableProps } from 'quasar';

export const DOCUMENT_DATA_COLUMN: QTableProps['columns'] = [
  {
    name: 'index',
    label: 'No',
    field: 'index',
    style: 'max-width: 60px',
    headerStyle: 'max-width: 60px',
    align: 'center',
  },
  {
    name: 'key',
    required: true,
    label: '항목',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'value',
    required: true,
    label: '내용',
    align: 'center',
    field: '',
    sortable: false,
  },
];

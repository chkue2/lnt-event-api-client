import { QTableProps } from 'quasar';

export const USER_LIST_COLUMN: QTableProps['columns'] = [
  {
    name: 'index',
    label: 'No',
    field: 'index',
    style: 'max-width: 60px',
    headerStyle: 'max-width: 60px',
    align: 'center',
  },
  {
    name: 'email',
    required: true,
    label: '이메일',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'fullName',
    required: true,
    label: '이름',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'store',
    required: true,
    label: '서비스',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'insCode',
    required: true,
    label: '기관코드',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'role',
    required: true,
    label: '권한',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'useFlag',
    required: true,
    label: '사용상태',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'accountExpired',
    required: true,
    label: '장기미접속여부',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'lastLogonTime',
    required: true,
    label: '마지막접속일시',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'createdAt',
    required: true,
    label: '등록일시',
    align: 'center',
    field: '',
    sortable: false,
  },
  {
    name: 'updatedAt',
    required: true,
    label: '변경일시',
    align: 'center',
    field: '',
    sortable: false,
  },
];

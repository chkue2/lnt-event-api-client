export const storeOptions = [
  {
    label: '법무인',
    value: 'KN',
  },
  {
    label: '관리자',
    value: '',
  },
];

export const userFlagOptions = [
  { label: '전체', value: '' },
  { label: '유효', value: 'Y' },
  { label: '승인대기', value: 'W' },
  { label: '정지', value: 'N' },
  { label: '탈퇴', value: 'D' },
];

export const roles: {
  [key: string]: string;
} = {
  ROLE_ADMIN: '관리자',
  ROLE_USER: '사용자',
};

export const roleOptions = [
  { label: '관리자', value: 'ROLE_ADMIN' },
  { label: '사용자', value: 'ROLE_USER' },
];

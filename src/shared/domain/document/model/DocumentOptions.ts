import { SelectOptions } from 'src/shared/model';

export const scopeOptions: SelectOptions[] = [
  { label: '전체', value: '' },
  { label: '요청', value: 'AS' },
  { label: '즉시응답', value: 'SN' },
];

export const catCodeOptions: SelectOptions[] = [
  { label: '전체', value: '' },
  { label: '웹소켓 로그인', value: 'SC-00' },
  { label: '웹소켓 로그인', value: 'SC-01' },
  { label: '웹소켓 로그인', value: 'SC-02' },
  { label: 'RPA 상태조회', value: 'SC-10' },
  { label: 'RPA 재실행', value: 'SC-11' },
  { label: '정보 조회', value: 'SC-20' },
  { label: '결과 없음', value: 'SC-21' },
  { label: '검증요청', value: 'SC-30' },
  { label: '검증 정상', value: 'SC-31' },
  { label: '검증 오류', value: 'SC-32' },
  { label: '전자신청', value: 'IR-00' },
  { label: '이폼신청', value: 'IR-01' },
  { label: '표시작성', value: 'IR-02' },
  { label: '신청서제출', value: 'IR-10' },
  { label: '신청서 출력', value: 'IR-11' },
  { label: '수수료 결제', value: 'IR-12' },
  { label: '처리현황 검색', value: 'IR-20' },
  { label: '진행사건 검색', value: 'IR-21' },
  { label: '등기필수령', value: 'IR-23' },
  { label: '접수 검증', value: 'IR-24' },
  { label: '열람', value: 'IR-30' },
  { label: '고유번호 조회', value: 'IR-40' },
  { label: '주소 조회', value: 'IR-41' },
  { label: '인감 등록', value: 'IR-50' },
  { label: '등기필정보 조회', value: 'IR-52' },
  { label: '등록세신고', value: 'WT-00' },
  { label: '납세정보 조회', value: 'WT-10' },
];

export const kindOptions: SelectOptions[] = [
  { label: '전체', value: '' },
  { label: '앱관리번호', value: 'app_id' },
  { label: '전문관리번호', value: 'doc_id' },
  { label: '사건관리번호', value: 'case_no' },
  { label: '은행관리번호', value: 'case_ref_no' },
  { label: '부가정보', value: 'info' },
];

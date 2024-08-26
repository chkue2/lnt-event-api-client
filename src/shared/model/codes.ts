export type RegStatusMainCode =
  | 'W100'
  | 'W200'
  | 'W400'
  | 'W500'
  | '2000-1'
  | '2000-2'
  | '2200'
  | 'W610-1'
  | 'W700'
  | 'W710'
  | 'W330'
  | 'W900';

export type RegStatusCode =
  | RegStatusMainCode
  | 'W120'
  | 'W120-1'
  | 'W120-2'
  | 'W210'
  | 'W210-1'
  | 'W210-2'
  | 'W300'
  | 'W430'
  | 'W450'
  | 'W450-1'
  | 'W450-2'
  | '2000-3'
  | '8110'
  | '8110-1'
  | '8110-3'
  | '5113'
  | '5117'
  | '5118'
  | 'W600'
  | 'W610'
  | 'W610-2'
  | '2310'
  | 'W800'
  | 'W810'
  | '2410'
  | '4010'
  | '2600';

export type StatusCode =
  | '10'
  | '11'
  | '12'
  | '20'
  | '21'
  | '22'
  | '30'
  | '31'
  | '32'
  | '40'
  | '41'
  | '42'
  | '50'
  | '51';

export type StatusCodeText =
  | '작성대기'
  | '작성요청'
  | '작성중'
  | '작성완료'
  | '연계실패'
  | '문서출력'
  | '제출요청'
  | '제출중'
  | '제출실패'
  | '제출완료'
  | '보정명령'
  | '보정완료'
  | '등기완료'
  | '필증수령';

export type StepCode =
  | 'home'
  | 'imageVerify'
  | 'originalVerify'
  | 'acquisition'
  | 'complete'
  | 'supplement'
  | 'revoke'
  | 'housingBond'
  | 'applicant'
  | 'sign'
  | 'cost'
  | 'progress'
  | 'submit';

export type RegisterType = 'ownership' | 'mortgage';

export type DateKind = 'sendDate' | 'completeDate';

export type KeywordKind = 'bankMgmtNo' | 'owner' | 'buildNo';

export type CheckGroupItemName = 'status' | 'irosState';

export interface CodeInfo {
  text: string;
  simpleText: string;
  hint: string;
  type: 'recev' | 'send' | 'etc';
}
export type RegStatusCodeInfos = {
  [propertyName in RegStatusCode]: CodeInfo;
};

export type Status = {
  [propertyName in StatusCode]: StatusCodeText;
};

export type StatusGroup = {
  [propertyName: number]: Status;
};

export type StatusDetail = {
  code: StatusCode;
  text: StatusCodeText;
};

export type IrosStateCode =
  | '10'
  | '20'
  | '21'
  | '22'
  | '30'
  | '31'
  | '32'
  | '40';

export type IrosStateCodeText =
  | '미접수'
  | '접수완료'
  | '기입중'
  | '조사대기'
  | '보정통지'
  | '각하통지'
  | '취하'
  | '등기완료';

export type IrosState = {
  [propertyName in IrosStateCode]: IrosStateCodeText;
};

export type IrosStateDetail = {
  code: IrosStateCode;
  text: IrosStateCodeText;
};

export interface DisplayData {
  value: string;
  isLabel: boolean;
}

export interface DisplayDataGroup {
  '1': DisplayData;
  '2': DisplayData;
  '3'?: DisplayData;
  '4'?: DisplayData;
}

export type DisplayDataRowCellType = 'mini' | 'between' | 'left-small' | 'full';
export interface DisplayDataRow {
  useSeparater: boolean;
  cellType: DisplayDataRowCellType;
  displayDataGroup: DisplayDataGroup;
}

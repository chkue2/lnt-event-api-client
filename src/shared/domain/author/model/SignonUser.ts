export interface User {
  userId: string;
  password: string;
  insCode: string;
  userName: string;
  position: string;
  phone: string;
  mobile: string;
  email: string;
  userPart: string;
  appAuth: number;
  webAuth: string;
  agree: number;
  valid: number;
  id: number;
  created_at: string;
  updated_at: string;
  approved_at: string;
  authType: number;
  loginFailCnt: number;
  partAuth: number;
  userIssueAuth: string;
}

export interface Ins {
  updated_at: string;
  insFax: string;
  insCode: string;
  groupCode: string;
  maxCnt: number;
  created_at: string;
  items: string;
  insNickName: string;
  insPhone: string;
  insPost: string;
  udsFaxNum: string;
  insChargeId: string;
  status: string;
  insPart: string;
  taxRep: string;
  insAddr: string;
  valid: number;
  insRep: string;
  upInsCode: string;
  insName: string;
  taxNum: string;
  bondYn: string;
  bankCode: string;
  adId: string;
  localCode: string;
  safeCode: string;
}

export interface InsAndUsers extends Ins {
  users: User[];
}

export interface SignonUser {
  user: User;
  office: InsAndUsers;
  insBanks: Ins[];
  insBranchs: Ins[];
}

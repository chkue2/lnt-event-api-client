export interface SearchSocketUserState {
  toDate?: string | null;
  fromDate?: string | null;
  scope?: string | null;
  catCode?: string | null;
  searchKey?: string | null;
  kind?: string | null;
  keyword?: string | null;
  userType?: string | null;
  useFlag?: string | null;
  state?: string | null;
  insCode?: string | null;
  store?: string | null;
  path?: string | null;
  limit?: number;
  cursor?: string;
}

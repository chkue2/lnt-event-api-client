import { WatchStopHandle } from 'vue';

export type ApiState = 'loading' | 'error' | 'none';

export interface Tax {
  obtainTax: number;
  regTax: number;
  eduTax: number;
  farmTax: number;
  regFee: number;
  stampTax: number;
  taxNo: string;
  epayNo: string;
}

export type Difference<T> = {
  oldValue: T;
  newValue: T;
};

export interface PiniaState {
  state: ApiState;
  edited: boolean;
  watcher: WatchStopHandle | null;
}

export type Domain =
  | 'real-estate'
  | 'ownership-appliers'
  | 'mortgage-appliers'
  | 'ownership-appl-infos'
  | 'mortgage-appl-info'
  | 'ownership-bonds'
  | 'mortgage-bond'
  | 'mortgage-register-entries'
  | 'mortgage-tax'
  | 'ownership-contract'
  | 'ownership-register-entries'
  | 'ownership-declared-tax'
  | 'ownership-due-tax'
  | 'trust-termination-tax'
  | 'ownership-fees'
  | 'mortgage-fees'
  | 'trust-termination-fees'
  | 'mortgage-progress-status'
  | 'ownership-progress-status';

export interface NormalRespond {
  message: string;
}

export interface ImageData {
  id: string;
  value: string;
}

export interface SelectOptions {
  label: string;
  value: string;
}

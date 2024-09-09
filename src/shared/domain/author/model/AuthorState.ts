import { ApiState } from 'src/shared/model';
import { SignonUser } from './SignonUser';

export interface AuthorState {
  state: ApiState;
  signonUser: SignonUser | null;
  errorMessage: string;
  active: boolean;
}

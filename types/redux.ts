import { firebaseUser } from './firebase';
import { IUser, Settings } from './index';

/**
 * Stores
 * */

// UI
export interface IUIStore {
  loading: boolean;
}

// Profile
export interface IProfileStore {
  user: IUser | firebaseUser | null;
  token: string;
  settings: Settings;
}

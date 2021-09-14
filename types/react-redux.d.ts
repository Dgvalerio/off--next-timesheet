import 'react-redux';
import { IProfileStore, IUIStore } from './redux';

declare module 'react-redux' {
  export interface DefaultRootState {
    profile: IProfileStore;
    ui: IUIStore;
  }
}

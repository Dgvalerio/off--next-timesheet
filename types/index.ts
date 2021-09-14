/**
 * Bases
 * */

// Settings
export interface Settings {
  id?: string;
  startOfWork: string;
  workingHours: string;
}

// User
export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

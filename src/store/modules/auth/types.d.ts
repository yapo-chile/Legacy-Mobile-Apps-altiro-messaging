interface UserData {
  socialId: string;
  name: string;
  shortName: string;
  email: string;
}

export interface AuthState {
  accSession: string;
  user: UserData;
  isLoggedIn: boolean;
}

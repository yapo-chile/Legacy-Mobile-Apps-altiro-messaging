interface UserData {
  socialId: string;
  name: string;
  shortName: string;
  email: string;
  userId: string;
  isProFor: string[];
}

export interface AuthState {
  accSession: string;
  user: UserData;
  isLoggedIn: boolean;
  isProfessional: boolean;
}

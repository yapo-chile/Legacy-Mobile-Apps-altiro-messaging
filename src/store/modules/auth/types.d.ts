interface UserData {
  avatar: string;
  userName: string;
  shortName: string;
  userEmail: string;
}

export interface AuthState {
  user: UserData;
  isLoggedIn: boolean;
}

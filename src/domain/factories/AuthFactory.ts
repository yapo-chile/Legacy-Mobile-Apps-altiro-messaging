import AuthService, { AuthInterface } from '@/domain/services/AuthService';

export class AuthFactory {
  public static createService(): AuthInterface {
    return new AuthService();
  }
}

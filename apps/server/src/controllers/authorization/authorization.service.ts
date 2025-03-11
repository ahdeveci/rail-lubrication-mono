import { Service } from 'typedi';

@Service()
export class AuthorizationService {
  async login(credentials: any): Promise<any> {
    return {
      accountName: 'accountName',
      mail: 'mail',
      displayName: 'displayName',
    };
  }
}

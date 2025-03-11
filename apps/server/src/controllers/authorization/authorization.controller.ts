import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/auth')
export class AuthorizationController {
  constructor() {}

  @Get('/login')
  async login(): Promise<any> {
    return {
      accountName: 'accountName',
      mail: 'mail',
      displayName: 'displayName',
    };
  }
}

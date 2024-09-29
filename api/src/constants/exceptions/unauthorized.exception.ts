import { CustomException } from '@/constants/exceptions/custom.exception';

export class UnauthorizedException extends CustomException {

  constructor(message: string, data?: any) {  

    super(message, 401, data || null);

  }

}
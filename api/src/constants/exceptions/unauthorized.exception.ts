import { CustomException } from '@/constants/exceptions/custom.exception';

export class UnauthorizedException extends CustomException {

  constructor(message: string, data?: unknown) {  

    super(message, 401, data || null);

  }

}
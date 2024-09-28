import { CustomException } from '@/constants/exceptions/custom.exception';

export class UnauthorizedException extends CustomException {

  constructor(message: string) {
    super(message, 401);
  }

}
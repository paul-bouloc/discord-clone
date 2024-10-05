import { CustomException } from '@/constants/exceptions/custom.exception';

export class InternalServerErrorException extends CustomException {

  constructor(message: string, data?: any) {
    super(message, 500, data || null);
  }

}
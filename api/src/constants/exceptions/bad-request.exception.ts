import { CustomException } from '@/constants/exceptions/custom.exception';

export class BadRequestException extends CustomException {

  constructor(message: string, data?: any) {
    super(message, 400, data || null);
  }

}
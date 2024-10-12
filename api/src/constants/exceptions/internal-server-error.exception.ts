import { CustomException } from '@/constants/exceptions/custom.exception';

export class InternalServerErrorException extends CustomException {

  constructor(message: string, data?: unknown) {
    super(message, 500, data || null);
  }

}
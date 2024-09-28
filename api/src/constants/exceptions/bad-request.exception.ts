import { CustomException } from '@/constants/exceptions/custom.exception';

export class BadRequestException extends CustomException {

  constructor(message: string) {
    super(message, 400);
  }

}
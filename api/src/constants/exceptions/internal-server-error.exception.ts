import { CustomException } from '@/constants/exceptions/custom.exception';

export class InternalServerErrorException extends CustomException {

  constructor(message: string) {
    super(message, 500);
  }

}
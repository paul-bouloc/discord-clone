import { CustomException } from '@/constants/exceptions/custom.exception';

export class ConflictException extends CustomException {

  constructor(message: string) {
    super(message, 409);
  }

}
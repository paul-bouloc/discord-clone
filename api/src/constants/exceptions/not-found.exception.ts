import { CustomException } from '@/constants/exceptions/custom.exception';

export class NotFoundException extends CustomException {

  constructor(message: string) {
    super(message, 404);
  }

}
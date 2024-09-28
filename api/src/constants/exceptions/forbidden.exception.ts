import { CustomException } from '@/constants/exceptions/custom.exception';

export class ForbiddenException extends CustomException {

  constructor(message: string) {
    super(message, 403);
  }

}
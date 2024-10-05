import { CustomException } from '@/constants/exceptions/custom.exception';

export class ForbiddenException extends CustomException {

  constructor(message: string, data?: any) {
    super(message, 403, data || null);
  }

}
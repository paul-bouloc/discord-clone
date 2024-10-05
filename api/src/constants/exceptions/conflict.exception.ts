import { CustomException } from '@/constants/exceptions/custom.exception';

export class ConflictException extends CustomException {

  constructor(message: string, data?: any) {
    super(message, 409, data || null);
  }

}
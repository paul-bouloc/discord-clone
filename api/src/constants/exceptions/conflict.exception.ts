import { CustomException } from '@/constants/exceptions/custom.exception';

export class ConflictException extends CustomException {

  constructor(message: string, data?: unknown) {
    super(message, 409, data || null);
  }

}
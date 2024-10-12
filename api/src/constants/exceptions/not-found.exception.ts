import { CustomException } from '@/constants/exceptions/custom.exception';

export class NotFoundException extends CustomException {

  constructor(message: string, data?: unknown) {
    super(message, 404, data || null);
  }

}
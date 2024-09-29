import { CustomException } from '@/constants/exceptions/custom.exception';

export class NotFoundException extends CustomException {

  constructor(message: string, data?: any) {
    super(message, 404, data || null);
  }

}
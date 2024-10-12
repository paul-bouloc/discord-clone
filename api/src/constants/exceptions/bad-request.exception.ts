import { CustomException } from "@/constants/exceptions/custom.exception";

export class BadRequestException extends CustomException {
  constructor(message: string, data?: unknown) {
    super(message, 400, data || null);
  }
}

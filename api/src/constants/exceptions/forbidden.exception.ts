import { CustomException } from "@/constants/exceptions/custom.exception";

export class ForbiddenException extends CustomException {
  constructor(message: string, data?: unknown) {
    super(message, 403, data || null);
  }
}

import { BadRequestException } from "@constants/exceptions/bad-request.exception";
import { ImageType } from "@prisma/client";

function isBase64(base64String: string): boolean {
  return /^data:image\/\w+;base64,/.test(base64String);
}

function getBase64Type(base64String: string): ImageType {
  try {
    const type = base64String
      .split(",")[0]
      ?.split(":")[1]
      ?.split("/")[1]
      ?.split(";")[0]
      ?.toUpperCase();
    if (!Object.values(ImageType).includes(type as ImageType))
      throw new Error();
    return type as ImageType;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new BadRequestException(
      "L'avatar doit être un format d'image valide",
    );
  }
}

function base64ToBinary(base64String: string): {
  type: ImageType;
  binary: Buffer<ArrayBuffer>;
} {
  if (!isBase64(base64String)) throw new Error("Invalid base64 string");

  const binary = Buffer.from(base64String.split(",")[1], "base64");
  const type = getBase64Type(base64String);

  if (!Object.values(ImageType).includes(type as ImageType))
    throw new Error("Invalid image type");

  return { type: type as ImageType, binary };
}

function binaryToBase64(imageBinary: Buffer, imageFormat: string): string {
  return `data:image/${imageFormat.toLowerCase()};base64,${imageBinary.toString("base64")}`;
}

export { getBase64Type, isBase64, base64ToBinary, binaryToBase64 };

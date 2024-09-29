import { ImageType } from '@prisma/client';

function isBase64(base64String: string): boolean {
  return /^data:image\/\w+;base64,/.test(base64String);
}

function base64ToBinary(base64String:string): {type: ImageType, binary: Buffer<ArrayBuffer>} {
  if (!isBase64(base64String)) throw new Error('Invalid base64 string');

  const binary = Buffer.from(base64String.split(',')[1], 'base64');
  const type = base64String.split(',')[0].split(':')[1].split('/')[1];

  if (!Object.values(ImageType).includes(type as ImageType)) throw new Error('Invalid image type');

  return {type: type as ImageType, binary};
}

function binaryToBase64(imageBinary: Buffer, imageFormat: string): string {
  return `data:image/${imageFormat};base64,${imageBinary.toString('base64')}`;
}

export {
  isBase64,
  base64ToBinary,
  binaryToBase64,
};
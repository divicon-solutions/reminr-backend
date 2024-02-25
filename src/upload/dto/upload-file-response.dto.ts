import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UploadFileResponseDto {
  @IsString()
  @IsUrl()
  fileUrl: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

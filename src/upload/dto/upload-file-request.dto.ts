import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UploadFileRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The path to upload the file to',
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description:
      'The name to use for the uploaded file (defaults to the original filename)',
  })
  @ValidateIf((o) => o.fileName !== '')
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fileName?: string;
}

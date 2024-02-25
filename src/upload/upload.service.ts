import { Injectable } from '@nestjs/common';
import { storage } from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { UploadFileRequestDto } from './dto/upload-file-request.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';

@Injectable()
export class UploadService {
  private getFileName(file: Express.Multer.File, filename?: string): string {
    let name = '';
    if (filename) {
      name = filename;
    } else {
      name = file.originalname.split('.').slice(0, -1).join('');
    }
    const ext = file.originalname.split('.').pop();
    return `${Date.now()}-${name}.${ext}`;
  }

  async uploadFile(
    uploadFileDto: UploadFileRequestDto,
    file: Express.Multer.File,
  ) {
    const response = await new Promise<UploadFileResponseDto>(
      async (resolve, reject) => {
        const fileName = this.getFileName(file, uploadFileDto.fileName);
        const blob = storage()
          .bucket()
          .file(`${uploadFileDto.path}/${fileName}`);
        const token = uuidv4();
        return blob
          .save(file.buffer, {
            public: false,
            metadata: {
              ContentType: file.mimetype,
              metadata: {
                firebaseStorageDownloadTokens: token, // define access token
              },
            },
          })
          .then(() => {
            return resolve({
              fileName: fileName,
              fileUrl: `https://firebasestorage.googleapis.com/v0/b/${
                storage().bucket().name
              }/o/${encodeURIComponent(blob.name)}?alt=media&token=${token}`,
              message: 'File uploaded successfully',
            });
          })
          .catch((err) => reject(err));
      },
    );
    return response;
  }
}

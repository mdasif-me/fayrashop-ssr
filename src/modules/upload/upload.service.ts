import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { ICloudinaryFile } from './interfaces';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryProvider: CloudinaryProvider,
    private readonly configService: ConfigService,
  ) {}

  /**
   * validation file before upload
   * validate max file size and allowed mime types
   */
  private validateFile(file: Express.Multer.File): void {
    const maxFileSize = this.configService.get<number>(
      'app.upload.maxFileSize',
    );
    const allowedMimeTypes = this.configService.get<string[]>(
      'app.upload.allowedMimeTypes',
    );

    if (maxFileSize && file.size > maxFileSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${maxFileSize / 1024 / 1024}MB`,
      );
    }

    if (allowedMimeTypes && !allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`,
      );
    }
  }

  /**
   * upload single file
   */
  async uploadSingle(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<ICloudinaryFile> {
    this.validateFile(file);

    const result = await this.cloudinaryProvider.uploadFile(file, folder);

    return {
      publicId: result.public_id as string,
      url: result.secure_url as string,
      format: result.format as string,
      width: result.width as number,
      height: result.height as number,
      bytes: result.bytes as number,
      resourceType: result.resource_type as string,
    };
  }

  /**
   * upload multiple files
   */
  async uploadMultiple(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<ICloudinaryFile[]> {
    files.forEach((file) => this.validateFile(file));

    const results = await this.cloudinaryProvider.uploadMultipleFiles(
      files,
      folder,
    );

    return results.map((result) => ({
      publicId: result.public_id as string,
      url: result.secure_url as string,
      format: result.format as string,
      width: result.width as number,
      height: result.height as number,
      bytes: result.bytes as number,
      resourceType: result.resource_type as string,
    }));
  }

  /**
   * delete single file by publicId
   */
  async deleteFile(publicId: string): Promise<void> {
    await this.cloudinaryProvider.deleteFile(publicId);
  }

  /**
   * delete multiple files by publicIds
   */
  async deleteMultipleFiles(publicIds: string[]): Promise<void> {
    await this.cloudinaryProvider.deleteMultipleFiles(publicIds);
  }
}

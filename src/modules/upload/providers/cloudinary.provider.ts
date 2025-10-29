import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  constructor(private readonly configService: ConfigService) {
    // configuration cloudinary instance
    cloudinary.config({
      cloud_name: this.configService.get<string>('app.cloudinary.cloudName'),
      api_key: this.configService.get<string>('app.cloudinary.apiKey'),
      api_secret: this.configService.get<string>('app.cloudinary.apiSecret'),
    });
  }

  /**
   * upload a file to Cloudinary
   * @param file Express.Multer.File
   * @param folder Optional folder path
   * @returns Upload result
   */
  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadFolder =
        folder || this.configService.get<string>('app.cloudinary.folder');

      cloudinary.uploader
        .upload_stream(
          {
            folder: uploadFolder,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              return reject(new Error(error.message || 'Unknown error'));
            }
            if (result) resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  /**
   * upload multiple files to Cloudinary
   * @param files Array of Express.Multer.File
   * @param folder Optional folder path
   * @returns Array of upload results
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<(UploadApiResponse | UploadApiErrorResponse)[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  /**
   * delete a file from Cloudinary
   * @param publicId Public ID of the file
   * @returns Deletion result
   */
  async deleteFile(publicId: string): Promise<any> {
    return cloudinary.uploader.destroy(publicId);
  }

  /**
   * Delete multiple files from Cloudinary
   * @param publicIds Array of public IDs
   * @returns Deletion results
   */
  async deleteMultipleFiles(publicIds: string[]): Promise<any> {
    return cloudinary.api.delete_resources(publicIds);
  }

  // Uncomment if needed in the future
  // /**
  //  * Get Cloudinary instance
  //  * @returns Cloudinary v2 instance
  //  */
  // getCloudinaryInstance() {
  //   return cloudinary;
  // }
}

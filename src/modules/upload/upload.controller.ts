import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload single file to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        folder: {
          type: 'string',
          description: 'Optional folder path in Cloudinary',
        },
      },
    },
  })

  /**
   * upload a single file to Cloudinary
   * @param file Express.Multer.File
   * @param folder Optional folder path
   * @returns Upload result
   */
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file' })
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.uploadService.uploadSingle(file, folder);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: 'Upload multiple files to Cloudinary (max 10)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        folder: {
          type: 'string',
          description: 'Optional folder path in Cloudinary',
        },
      },
    },
  })

  /**
   * upload multiple files to Cloudinary
   * @param files Array of Express.Multer.File
   * @param folder Optional folder path
   * @returns Array of upload results
   */
  @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid files' })
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    return this.uploadService.uploadMultiple(files, folder);
  }

  /**
   * delete a single file from Cloudinary
   * @param publicId
   * @returns Deletion result
   */
  @Delete('single')
  @ApiOperation({ summary: 'Delete single file from Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Cloudinary public ID',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async deleteFile(@Body('publicId') publicId: string) {
    if (!publicId) {
      throw new BadRequestException('Public ID is required');
    }
    return this.uploadService.deleteFile(publicId);
  }

  /**
   * delete multiple files from Cloudinary
   * @param publicIds Array of public IDs
   * @returns Deletion result
   */
  @Delete('multiple')
  @ApiOperation({ summary: 'Delete multiple files from Cloudinary' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of Cloudinary public IDs',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Files deleted successfully' })
  async deleteMultipleFiles(@Body('publicIds') publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) {
      throw new BadRequestException('Public IDs are required');
    }
    return this.uploadService.deleteMultipleFiles(publicIds);
  }
}

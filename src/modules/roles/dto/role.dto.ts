import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'The name of the role',
    uniqueItems: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Administrator role',
    description: 'The description of the role',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['create_user', 'delete_user'],
    description: 'Permissions assigned to the role',
  })
  @IsString({ each: true })
  permissions: string[];
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  updatedBy?: string;
}

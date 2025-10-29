import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { RoleDocument } from './interfaces/role.interface';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import {
  ConflictRequestException,
  ResourceNotFoundException,
} from '../../errors/custom';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name,
    });

    if (existingRole) {
      throw new ConflictRequestException('Role with this name already exists');
    }

    const newRole = new this.roleModel(createRoleDto);
    return newRole.save();
  }

  async findAll(): Promise<RoleDocument[]> {
    return this.roleModel.find().exec();
  }

  async findById(id: string): Promise<RoleDocument> {
    const role = await this.roleModel.findById(id).exec();

    if (!role) {
      throw new ResourceNotFoundException('Role');
    }

    return role;
  }

  async findByName(name: string): Promise<RoleDocument | null> {
    return this.roleModel.findOne({ name }).exec();
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDocument> {
    const role = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
    });

    if (!role) {
      throw new ResourceNotFoundException('Role');
    }

    return role;
  }

  async delete(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id);

    if (!result) {
      throw new ResourceNotFoundException('Role');
    }
  }

  async seedDefaultRoles(): Promise<void> {
    const defaultRoles = [
      {
        name: 'admin',
        description: 'Administrator with full access',
        permissions: ['*'],
      },
      {
        name: 'user',
        description: 'Regular user with basic access',
        permissions: ['read'],
      },
      {
        name: 'manager',
        description: 'Manager with extended access',
        permissions: ['read', 'write', 'update'],
      },
    ];

    for (const roleData of defaultRoles) {
      const existingRole = await this.roleModel.findOne({
        name: roleData.name,
      });

      if (!existingRole) {
        await this.roleModel.create(roleData);
      }
    }
  }
}

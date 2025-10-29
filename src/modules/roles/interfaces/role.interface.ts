import { Document } from 'mongoose';
import { Role } from '../schemas/role.schema';

export type RoleDocument = Role & Document;

export interface IRoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

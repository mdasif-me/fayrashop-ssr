import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from './schemas/user.schema';
import {
  ICreateUser,
  IUpdateUser,
  IUserResponse,
} from './interface/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import {
  ConflictRequestException,
  ResourceNotFoundException,
} from '../../errors/custom';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUserResponse>,
    private configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto | ICreateUser,
  ): Promise<IUserResponse> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictRequestException('User with this email already exists');
    }

    const bcryptRounds =
      this.configService.get<number>('app.bcrypt.rounds') || 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      bcryptRounds,
    );

    const userData: Partial<User> = {
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password_hash: hashedPassword,
      phone: createUserDto.phone,
      avatar_url: createUserDto.avatar_url,
    };

    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<IUserResponse | null> {
    return this.userModel.findOne({ email }).populate('role').exec();
  }

  async findById(id: string): Promise<IUserResponse> {
    const user = await this.userModel.findById(id).populate('role').exec();

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    return user;
  }

  async findAll(
    filter: FilterQuery<IUserResponse> = {},
  ): Promise<IUserResponse[]> {
    return this.userModel.find(filter).populate('role').exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto | IUpdateUser,
  ): Promise<IUserResponse> {
    const updateData: Partial<User> = {};

    if (updateUserDto.first_name)
      updateData.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name) updateData.last_name = updateUserDto.last_name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.phone) updateData.phone = updateUserDto.phone;
    if (updateUserDto.avatar_url)
      updateData.avatar_url = updateUserDto.avatar_url;
    if ('status' in updateUserDto) updateData.status = updateUserDto.status;
    if ('lastLoginAt' in updateUserDto) {
      updateData.last_login_at = updateUserDto.lastLoginAt;
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('role')
      .exec();

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    return user;
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const bcryptRounds =
      this.configService.get<number>('app.bcrypt.rounds') || 10;
    const hashedPassword = await bcrypt.hash(newPassword, bcryptRounds);

    const result = await this.userModel
      .findByIdAndUpdate(id, {
        password_hash: hashedPassword,
      })
      .exec();

    if (!result) {
      throw new ResourceNotFoundException('User');
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new ResourceNotFoundException('User');
    }
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async deactivateUser(id: string): Promise<IUserResponse> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { status: false }, { new: true })
      .populate('role')
      .exec();

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    return user;
  }

  async activateUser(id: string): Promise<IUserResponse> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { status: true }, { new: true })
      .populate('role')
      .exec();

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    return user;
  }
}

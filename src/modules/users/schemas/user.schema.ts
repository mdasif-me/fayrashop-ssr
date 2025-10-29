import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password_hash: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar_url?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  role?: MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  is_email_verified: boolean;

  @Prop()
  email_verification_token?: string;

  @Prop()
  email_verification_expires?: Date;

  @Prop()
  password_reset_token?: string;

  @Prop()
  password_reset_expires?: Date;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ type: Object })
  shipping_address?: Record<string, any>;

  @Prop({ type: Object })
  billing_address?: Record<string, any>;

  @Prop({ type: Array, default: [] })
  address: Record<string, any>[];

  @Prop({ type: Array, default: [] })
  cart_items: Record<string, any>[];

  @Prop({ type: Array, default: [] })
  wishlist: Record<string, any>[];

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Order', default: [] })
  orders: MongooseSchema.Types.ObjectId[];

  @Prop()
  gender?: string;

  @Prop()
  date_of_birth?: Date;

  @Prop()
  last_login_at?: Date;

  @Prop()
  lock_until?: Date;

  @Prop({ default: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });

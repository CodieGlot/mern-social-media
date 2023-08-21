import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserRole } from '../../../constants';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {
    @ApiProperty()
    @Prop({ type: String })
    username: string;

    @ApiProperty({ type: 'enum', enum: UserRole })
    @Prop({ type: String, enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Exclude()
    @Prop({ type: String })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

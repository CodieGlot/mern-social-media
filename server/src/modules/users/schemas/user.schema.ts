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

    @ApiProperty({ type: String })
    @Prop({ type: String, default: '' })
    picturePath: string;

    @ApiProperty({ type: () => [String] })
    @Prop({
        type: [
            {
                userId: { type: String },
                username: { type: String }
            }
        ],
        default: [],
        _id: false
    })
    friendList: Array<{ userId: string; username: string }>;

    @ApiProperty()
    @Prop({ type: String, default: '' })
    location: string;

    @ApiProperty()
    @Prop({ type: String, default: '' })
    occupation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

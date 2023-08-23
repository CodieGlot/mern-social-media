import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class BlogPost extends Document {
    @ApiProperty()
    @Prop({ type: String })
    userId: string;

    @ApiProperty()
    @Prop({ type: String })
    username: string;

    @ApiProperty()
    @Prop({ type: String })
    location: string;

    @ApiProperty()
    @Prop({ type: String })
    userPicturePath: string;

    @ApiProperty()
    @Prop({ type: String })
    description: string;

    @ApiProperty()
    @Prop({ type: String })
    picturePath: string;

    @ApiProperty()
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
    likes: Array<{ userId: string; username: string }>;

    @ApiProperty()
    @Prop({
        type: [
            {
                userId: { type: String },
                username: { type: String },
                userPicturePath: { type: String },
                content: { type: String }
            }
        ],
        default: []
    })
    comments: Array<{ userId: string; username: string; userPicturePath: string; content: string }>;

    @ApiProperty({ type: Date })
    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

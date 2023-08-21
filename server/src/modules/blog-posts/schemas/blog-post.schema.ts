import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class BlogPost extends Document {
    @ApiProperty()
    @Prop({ type: String })
    title: string;

    @ApiProperty()
    @Prop({ type: String })
    message: string;

    @ApiProperty()
    @Prop({ type: String })
    creator: string;

    @ApiProperty({ type: [String] })
    @Prop({ type: [String] })
    tags: string[];

    @ApiProperty()
    @Prop({ type: String })
    selectedFile: string;

    @ApiProperty({ type: Number, default: 0 })
    @Prop({ type: Number, default: 0 })
    likeCount: number;

    @ApiProperty({ type: Date })
    @Prop({ type: Date, default: new Date() })
    createdAt: Date;
}

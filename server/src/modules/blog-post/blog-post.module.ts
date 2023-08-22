import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { BlogPost, BlogPostSchema } from './schemas';

@Module({
    imports: [MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }])],
    controllers: [BlogPostController],
    providers: [BlogPostService]
})
export class BlogPostModule {}

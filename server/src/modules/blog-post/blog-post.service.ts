import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from './schemas';
import { PageDto, PageMetaDto, PageQueryDto, ResponseDto } from '../../common/dto';
import { CreatePostDto, UpdatePostDto } from './dto/request';

@Injectable()
export class BlogPostService {
    constructor(@InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>) {}

    async getPostsWithPagination(pageQueryDto: PageQueryDto) {
        const entities = await this.blogPostModel
            .find()
            .sort({ createdAt: pageQueryDto.sortOrder })
            .skip(pageQueryDto.skip)
            .limit(pageQueryDto.limit)
            .exec();

        const itemCount = await this.blogPostModel.countDocuments();

        const pageMetaDto = new PageMetaDto({ pageQueryDto, itemCount });

        return new PageDto(entities, pageMetaDto);
    }

    async findPostById(id: string) {
        const post = await this.blogPostModel.findById(id);

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        return post;
    }

    async createPost(dto: CreatePostDto, username: string) {
        const newPost = new this.blogPostModel({
            ...dto,
            creator: username
        });

        await newPost.save();

        return new ResponseDto({ message: 'Create post successfully' });
    }

    async updatePostById(id: string, dto: UpdatePostDto, username: string) {
        const post = await this.findPostById(id);

        if (username !== post.creator) {
            throw new UnauthorizedException('Unauthorized');
        }

        await this.blogPostModel.findByIdAndUpdate(id, dto, { new: true });

        return new ResponseDto({ message: 'Post updated successfully' });
    }

    async deletePostById(id: string, username: string) {
        const post = await this.findPostById(id);

        if (username !== post.creator) {
            throw new UnauthorizedException('Unauthorized');
        }

        await this.blogPostModel.findByIdAndRemove(id);

        return new ResponseDto({ message: 'Post deleted successfully' });
    }

    async likePostById(id: string) {
        const post = await this.findPostById(id);

        await this.blogPostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

        return new ResponseDto({ message: 'Post liked successfully' });
    }
}

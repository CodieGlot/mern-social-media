import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from './schemas';
import { PageDto, PageMetaDto, PageQueryDto, ResponseDto } from '../../common/dto';
import { CreateCommentDto, CreatePostDto, UpdatePostDto } from './dto/request';
import type { User } from '../users/schemas';

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

    async createPost(dto: CreatePostDto, user: User) {
        const newPost = new this.blogPostModel({
            ...dto,
            userId: user.id,
            username: user.username,
            location: user.location,
            userPicturePath: user.picturePath
        });

        await newPost.save();

        return new ResponseDto({ message: 'Create post successfully' });
    }

    async updatePostById(id: string, dto: UpdatePostDto, user: User) {
        const post = await this.findPostById(id);

        if (user.id !== post.userId) {
            throw new UnauthorizedException();
        }

        await this.blogPostModel.findByIdAndUpdate(id, dto);

        return new ResponseDto({ message: 'Post updated successfully' });
    }

    async deletePostById(id: string, user: User) {
        const post = await this.findPostById(id);

        if (user.id !== post.userId) {
            throw new UnauthorizedException();
        }

        await this.blogPostModel.findByIdAndRemove(id);

        return new ResponseDto({ message: 'Post deleted successfully' });
    }

    async likePostById(id: string, user: User) {
        const post = await this.findPostById(id);

        let userIndex = -1;

        for (let i = 0; i !== post.likes.length; i++) {
            if (user.id === post.likes[i].userId) {
                userIndex = i;
                break;
            }
        }

        if (userIndex === -1) {
            post.likes.push({ userId: user.id, username: user.username });
        } else {
            post.likes.splice(userIndex, 1);
        }

        await this.blogPostModel.findByIdAndUpdate(id, { likes: post.likes });

        return new ResponseDto({ message: 'Post liked/unliked successfully' });
    }

    async commentPostById(id: string, dto: CreateCommentDto, user: User) {
        const post = await this.findPostById(id);

        post.comments.push({
            userId: user.id,
            username: user.username,
            content: dto.content,
            userPicturePath: user.picturePath
        });

        await this.blogPostModel.findByIdAndUpdate(id, { comments: post.comments });

        return new ResponseDto({ message: 'User has commented the post' });
    }
}

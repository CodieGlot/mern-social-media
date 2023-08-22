import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto, PageQueryDto, ResponseDto } from '../../common/dto';
import { BlogPost } from './schemas';
import { Auth, AuthUser } from '../../decorators';
import { UserRole } from '../../constants';
import { CreatePostDto, UpdatePostDto } from './dto/request';
import type { User } from '../users/schemas';

@ApiTags('blog-post')
@Controller('blog-post')
export class BlogPostController {
    constructor(private readonly blogPostService: BlogPostService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Get posts with pagination',
        type: PageDto
    })
    @ApiOperation({ summary: 'Get posts with pagination' })
    getPostsWithPagination(@Query() pageQueryDto: PageQueryDto) {
        return this.blogPostService.getPostsWithPagination(pageQueryDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Get post by id',
        type: BlogPost
    })
    @ApiOperation({ summary: 'Get post by id' })
    findPostById(@Param('id') id: string) {
        return this.blogPostService.findPostById(id);
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiCreatedResponse({
        description: 'Create post',
        type: ResponseDto
    })
    @ApiOperation({ summary: 'Create post' })
    createPost(@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
        return this.blogPostService.createPost(createPostDto, user.username);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Update post by id',
        type: ResponseDto
    })
    @ApiOperation({ summary: 'Update post by id' })
    updatePostById(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @AuthUser() user: User) {
        return this.blogPostService.updatePostById(id, updatePostDto, user.username);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Delete post by id',
        type: ResponseDto
    })
    @ApiOperation({ summary: 'Delete post by id' })
    deletePostById(@Param('id') id: string, @AuthUser() user: User) {
        return this.blogPostService.deletePostById(id, user.username);
    }

    @Patch(':id/likePost')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Like post by id',
        type: ResponseDto
    })
    @ApiOperation({ summary: 'Like post by id' })
    likePostById(@Param('id') id: string) {
        return this.blogPostService.likePostById(id);
    }
}

import { Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserRole } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { User } from './schemas';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Get user by id',
        type: User
    })
    @ApiOperation({ summary: 'Get user by id' })
    async findUserById(@Param('id') id: string) {
        const user = (await this.usersService.findUserByIdOrUsername({ id })).toObject();

        return user;
    }

    @Patch(':id/friends/:friendId')
    @HttpCode(HttpStatus.OK)
    @Auth([UserRole.ADMIN, UserRole.USER])
    @ApiOkResponse({
        description: 'Add/Remove friend by id',
        type: User
    })
    @ApiOperation({ summary: 'Add/Remove friend by id' })
    addRemoveFriendById(
        @Param('id') id: string,
        @Param('friendId') friendId: string,
        @AuthUser() user: User
    ) {
        return this.usersService.addRemoveFriendById(id, friendId, user);
    }
}

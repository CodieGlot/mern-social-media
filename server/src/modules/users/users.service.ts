import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { UserCredentialDto } from '../auth/dto/request';
import { generateHash } from '../../common/utils';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(dto: UserCredentialDto) {
        const user = await this.findUserByIdOrUsername({ username: dto.username });

        if (user) {
            throw new ConflictException('USER ALREADY EXISTS');
        }

        const newUser = new this.userModel({
            username: dto.username,
            password: await generateHash(dto.password)
        });

        return newUser.save();
    }

    async findUserByIdOrUsername({ id, username }: { id?: string; username?: string }) {
        return id ? await this.userModel.findById(id) : await this.userModel.findOne({ username });
    }

    /* async paginateUsers(pageQueryDto: PageQueryDto) {
        const entities = await this.userModel
            .find()
            .sort({ createdAt: pageQueryDto.sortOrder })
            .skip(pageQueryDto.skip)
            .limit(pageQueryDto.limit)
            .exec();

        const itemCount = await this.userModel.countDocuments();

        const pageMetaDto = new PageMetaDto({ pageQueryDto, itemCount });

        return new PageDto(entities, pageMetaDto);
    } */
}

import { StringField } from '../../../../decorators';

export class CreatePostDto {
    @StringField()
    description: string;

    @StringField()
    picturePath: string;
}

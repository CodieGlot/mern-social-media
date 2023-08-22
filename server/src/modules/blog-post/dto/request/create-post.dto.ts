import { StringField } from '../../../../decorators';

export class CreatePostDto {
    @StringField()
    title: string;

    @StringField()
    message: string;

    @StringField({ each: true })
    tags: string[];

    @StringField()
    selectedFile: string;
}

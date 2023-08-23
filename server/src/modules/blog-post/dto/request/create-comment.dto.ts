import { StringField } from '../../../../decorators';

export class CreateCommentDto {
    @StringField()
    content: string;
}

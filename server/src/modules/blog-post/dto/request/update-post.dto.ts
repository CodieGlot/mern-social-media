import { StringFieldOptional } from '../../../../decorators';

export class UpdatePostDto {
    @StringFieldOptional()
    description: string;

    @StringFieldOptional()
    picturePath: string;
}

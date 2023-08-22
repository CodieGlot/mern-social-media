import { StringFieldOptional } from '../../../../decorators';

export class UpdatePostDto {
    @StringFieldOptional()
    title: string;

    @StringFieldOptional()
    message: string;

    @StringFieldOptional({ each: true })
    tags: string[];

    @StringFieldOptional()
    selectedFile: string;
}

import { ApiProperty } from '@nestjs/swagger';
import type { PageQueryDto } from './page-query.dto';

interface PageMetaDtoParameters {
    pageQueryDto: PageQueryDto;
    itemCount: number;
}

export class PageMetaDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly limit: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({ pageQueryDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageQueryDto.page;
        this.limit = pageQueryDto.limit;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}

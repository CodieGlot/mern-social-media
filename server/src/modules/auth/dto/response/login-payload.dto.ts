import { ApiProperty } from '@nestjs/swagger';
import { AuthTokenPayloadDto } from './auth-token-payload.dto';

export class LoginPayloadDto {
    @ApiProperty()
    authToken: AuthTokenPayloadDto;

    @ApiProperty()
    user: any;

    constructor(dto: LoginPayloadDto) {
        Object.assign(this, dto);
    }
}

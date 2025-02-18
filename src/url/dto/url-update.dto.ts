import { PartialType } from '@nestjs/swagger';
import { UrlCreateDto } from './url-create.dto';

export class UrlUpdateDto extends PartialType(UrlCreateDto) {}

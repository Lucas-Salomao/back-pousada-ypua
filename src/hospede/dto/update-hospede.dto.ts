import { PartialType } from '@nestjs/swagger';
import { CreateHospedeDto } from './create-hospede.dto';

export class UpdateHospedeDto extends PartialType(CreateHospedeDto) {}

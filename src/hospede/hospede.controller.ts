import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospedeService } from './hospede.service';
import { CreateHospedeDto } from './dto/create-hospede.dto';
import { UpdateHospedeDto } from './dto/update-hospede.dto';

@Controller('/hospede')
export class HospedeController {
  constructor(private readonly hospedeService: HospedeService) {}

  @Post()
  create(@Body() createHospedeDto: CreateHospedeDto) {
    return this.hospedeService.create(createHospedeDto);
  }

  @Get()
  findAll() {
    return this.hospedeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospedeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospedeDto: UpdateHospedeDto) {
    return this.hospedeService.update(+id, updateHospedeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospedeService.remove(+id);
  }
}

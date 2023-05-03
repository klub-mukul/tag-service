import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  create(@Body() createTagDto: CreateTagDto, @Headers("createdBy") createdBy: string) {
    return this.tagsService.create(createTagDto, createdBy);
  }

//   @Get()
//   findAll() {
//     return this.tagsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.tagsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
//     return this.tagsService.update(+id, updateTagDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.tagsService.remove(+id);
//   }
}

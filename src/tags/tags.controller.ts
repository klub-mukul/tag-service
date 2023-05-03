import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

}

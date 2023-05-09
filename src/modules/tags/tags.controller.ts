import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import * as fs from 'fs';
import multer from 'multer';
import { UpdatedByDto } from '../../common/dto/updatedBy.dto';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { TagsService } from './tags.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { logger } from 'src/config/logger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTagDto: CreateTagDto) {
    logger.info('Post');
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@Query() getDto: any) {
    return this.tagsService.findAll(getDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.find(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() updatedByDto: UpdatedByDto) {
    return this.tagsService.delete(id, updatedByDto.updatedBy);
  }

  //   @Post('/bulk')
  //   // @UseInterceptors(FileInterceptor('file',{
  //   //   storage: diskStorage({
  //   //     destination: "./uploads",
  //   //     filename: (req, file, cb) => {
  //   //       cb(null, `${file.originalname}`)
  //   //     }
  //   //   })
  //   // }))
  //   // async bulkUpload(){
  //   //   logger.info("Bulk upload");

  //   //   const csvFile = readFileSync('uploads/abc');
  //   //   const csvData = csvFile.toString();

  //   //   const parsedCsv = await parse(csvData, {
  //   //     headers: true,
  //   //     skipEmptyLines: true,
  //   //     transformHeader: (header)=>header.toLowerCase().replace('#','').trim(),
  //   //     complete: (results)=>results.data
  //   //   });

  //   //   return 'done';
  //   // }

  //   // @Post('1')
  // @UseInterceptors(
  //     FileInterceptor('file', {})
  // )
  // async uploadFile(@UploadedFile() file: Express.Multer.File ){
  //     const stream = Readable.from(file.buffer);
  //     const csvData = papa.parse(stream, {
  //         header: false,
  //         worker: true,
  //         delimiter: ",",
  //         step: function (row){
  //             console.log("Row: ", row.data);
  //         }
  //       });
  // }

  // @Post('upload')
  // @UseInterceptors(multer({ dest: 'uploads' }).single('file'))
  // async uploadFile(@UploadedFile() file) {
  //   // const results = [];

  //   fs.createReadStream('./migration_data.csv')
  //     .pipe(fs.parse({ delimiter: ',', from_line: 2 }))
  //     .on('data', function (row) {
  //       console.log(row);
  //     })
  //     .on('end', function () {
  //       console.log('finished');
  //     })
  //     .on('error', function (error) {
  //       console.log(error.message);
  //     });

  //   return { message: 'File uploaded successfully' };
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}

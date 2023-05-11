import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { HealthController } from './modules/health/health.controller';
import { TagModule } from './modules/tags/tag.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        SharedModule,
        MulterModule.register({
          dest: 'src/uploads',
        }),
      ],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    TerminusModule,
    TagModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [HealthController, AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // console.log('__dirname' + __dirname);
  }
}

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

/**
 * providers
 * @type {*}
 */
const providers = [ConfigService];

/**
 * SharedModule
 * @export
 * @class SharedModule
 */
@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: () => ({}),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}

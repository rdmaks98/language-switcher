import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigureModule } from './configuration/config';
import { DatabaseModule } from './loaders/database.module';
import { PharseModule } from './modules/pharse/pharse.module';

@Module({
  imports: [
    ConfigureModule,
    DatabaseModule,
    PharseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

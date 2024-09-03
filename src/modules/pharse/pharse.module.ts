import { Module } from '@nestjs/common';
import { PharseService } from './service/pharse.service';
import { PharseController } from './controller/pharse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import PhraseSchema from '../../schema/pharse.schema';
import { ResponseHandlerService } from '../../common/responseHandler.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Phrase', schema: PhraseSchema }
    ])],
  controllers: [PharseController],
  providers: [PharseService, ResponseHandlerService],
  exports: [PharseService, ResponseHandlerService]
})
export class PharseModule { }

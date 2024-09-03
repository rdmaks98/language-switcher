import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { PharseService } from '../service/pharse.service';
import { ResponseHandlerService } from 'src/common/responseHandler.service';

@Controller('pharse')
export class PharseController {
  constructor(private readonly pharseService: PharseService,
    private readonly responseService: ResponseHandlerService
  ) {
  }

  @Get('/search')
  async searchPhrases(
    @Res() res,
    @Query('query') query: string,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query('status') status: string,
  ) {
    try {
      const result = await this.pharseService.searchPharseByQuery(query, sortBy, sortOrder, status);
      return this.responseService.sendSuccessResponse(
        res,
        result,
        'get',
        'pharse result with filter get Successfully',
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/')
  async getPhraseList(@Res() res) {
    try {
      const phraseExecuter = await this.pharseService.pharseList();
      return this.responseService.sendSuccessResponse(
        res,
        phraseExecuter,
        'get',
        'pharses result fetch Successfully',
      );
    }
    catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  async getPhrase(@Res() res, @Param('id') id: string) {
    try {
      const phraseResultExecuter = await this.pharseService.findById(id);
      return this.responseService.sendSuccessResponse(
        res,
        phraseResultExecuter,
        'get',
        'pharse result fetch Successfully',
      );
    }
    catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/:language')
  async getTranslation(@Res() res, @Param('id') id: string, @Param('language') language: string) {
    try {
      const translation = await this.pharseService.findTranslation(id, language);
      if (!translation) {
        throw new NotFoundException(`Translation for id ${id} and language ${language} not found`);
      }
      return this.responseService.sendSuccessResponse(
        res,
        translation,
        'get',
        'pharse result with transaltion get Successfully',
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }


}

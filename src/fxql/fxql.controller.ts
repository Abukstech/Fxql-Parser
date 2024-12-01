/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { FxqlService } from './fxql.service';

@Controller('fxql')
export class FxqlController {
  constructor(private readonly fxqlService: FxqlService) {}

  @Post()
  async submitFxql(@Body('FXQL') fxql: string) {
    return this.fxqlService.processStatement(fxql);
  }
}

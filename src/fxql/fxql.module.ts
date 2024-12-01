/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { FxqlController } from './fxql.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fxql } from './entities/fxql.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fxql]), // Register FxqlBlock entity
  ],
  providers: [FxqlService],
  controllers: [FxqlController]
})
export class FxqlModule {}

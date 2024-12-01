/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FxqlModule } from './fxql/fxql.module';
import { Fxql } from './fxql/entities/fxql.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Palmer20',
      database: 'FXQL',
      autoLoadEntities: true,
      entities:{Fxql},
      synchronize: true, // Use only for development
    }),
    FxqlModule,
  ],
})
export class AppModule {}

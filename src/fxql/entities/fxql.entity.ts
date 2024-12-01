/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fxql')
export class Fxql {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceCurrency: string; // Example: USD

  @Column()
  destinationCurrency: string; // Example: GBP

  @Column('decimal', { precision: 10, scale: 2 })
  buy: number;

  @Column('decimal', { precision: 10, scale: 2 })
  sell: number;

  @Column('int')
  cap: number;
}

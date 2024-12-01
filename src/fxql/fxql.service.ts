/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fxql } from './entities/fxql.entity';
import { FxqlBlock, parseFxqlStatement } from './utilis/fxql.parser';


@Injectable()
export class FxqlService {
    constructor(
      @InjectRepository(Fxql)
      private fxqlRepository: Repository<Fxql>,
    ) {}
  
    async processStatement(fxql: string) {
      try {
        const parsedData: FxqlBlock[] = parseFxqlStatement(fxql);

        let savedData: Fxql
  
        for (const data of parsedData) {
            // Split currencyPair into sourceCurrency and destinationCurrency
            const [sourceCurrency, destinationCurrency] = data.currencyPair.split('-');
    
            // Create a new Fxql entry with the parsed data
            const fxqlEntry = this.fxqlRepository.create({
              sourceCurrency,          // Source currency (e.g., USD)
              destinationCurrency,     // Destination currency (e.g., GBP)
              buy: data.buy,
              sell: data.sell,
              cap: data.cap,
            });
    
            // Save the entry to the database
           savedData  = await this.fxqlRepository.save(fxqlEntry);
          }
        return { message: 'FXQL statement processed successfully', data: savedData };
      } catch (error) {
        return { message: 'Error processing FXQL statement', error: error.message };
      }
    }
  }

import { Module } from '@nestjs/common';
import { JsonSearchService } from '@partituras/services';

import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: 'ISearchService', useClass: JsonSearchService }],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JsonPartituraService } from '@partituras/services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: 'IPartituraService', useClass: JsonPartituraService }],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JsonPartituraService } from '@partituras/services';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: 'IPartituraService', useClass: JsonPartituraService }],
})
export class AppModule {}

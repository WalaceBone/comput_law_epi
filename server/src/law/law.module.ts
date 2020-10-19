import { Module } from '@nestjs/common';
import { LawController } from './law.controller';
import { LawService } from './law.service';

@Module({
  controllers: [LawController],
  exports: [LawService],
  providers: [LawService]
})
export class LawModule {}

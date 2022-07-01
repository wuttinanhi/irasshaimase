import { Module } from '@nestjs/common';
import { PdfMakerService } from './pdf-maker.service';

@Module({
  providers: [PdfMakerService],
  exports: [PdfMakerService],
})
export class PdfMakerModule {}

import { Controller, Get, Query, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderGetGuard } from '../order/order.guard';
import { PdfMakerService } from '../pdf-maker/pdf-maker.service';
import { ReceiptService } from './receipt.service';

@Controller('api/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService, private readonly pdfMakerService: PdfMakerService) {}

  @Get('get')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async findAll(@Res({ passthrough: true }) response: Response, @Query('id') id: number) {
    // get receipt data
    const receiptData = await this.receiptService.getById(id);

    // get current directory
    const dir = process.cwd();
    // handlebar template file path
    const inputPath = `${dir}/template/receipt.hbs`;
    // output file path
    const outputPath = `${dir}/output/${id}.pdf`;

    // generate pdf
    const filePath = await this.pdfMakerService.generate(inputPath, outputPath, receiptData);

    // create read stream
    const file = createReadStream(filePath);
    response.set({
      'Content-Type': 'application/pdf',
      // uncomment for file download
      // 'Content-Disposition': 'attachment; filename="test.pdf"',
    });

    // return stream
    return new StreamableFile(file);
  }
}

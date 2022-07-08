import { Controller, Get, Query, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderGetGuard } from '../order/order.guard';
import { ReceiptService } from './receipt.service';

@Controller('api/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get('get')
  @UseGuards(JwtAuthGuard, OrderGetGuard)
  async get(@Res({ passthrough: true }) response: Response, @Query('id') id: number) {
    // generate receipt and retrieve file path
    const pdfFilePath = await this.receiptService.generateReceiptPdf(id);

    // create read stream
    const file = createReadStream(pdfFilePath);
    response.set({
      'Content-Type': 'application/pdf',
      // uncomment for file download
      // 'Content-Disposition': 'attachment; filename="test.pdf"',
    });

    // return stream
    return new StreamableFile(file);
  }
}

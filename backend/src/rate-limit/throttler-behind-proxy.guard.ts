import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Request): string {
    const ip = req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
    return ip;
  }
}

import { Controller, Get, Res } from '@nestjs/common';
import { FrontService } from './front.service';
import { Response } from 'express';

@Controller()
export class FrontController {
  constructor(private readonly frontService: FrontService) {}
  @Get()
  root(@Res({ passthrough: false }) res: Response) {
    const path = this.frontService.root();
    res.status(200).sendFile(path);

    return this.frontService.root();
  }
}

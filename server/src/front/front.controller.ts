import { Controller, Get, Render } from '@nestjs/common';

@Controller('front')
export class FrontController {
  @Get()
  @Render('index')
  root() {
    return this.root();
  }
}

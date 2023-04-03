import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class FrontService {
  root() {
    const indexPath = join(__dirname, '..', '..', 'public', 'index.html');
    return indexPath;
  }
}

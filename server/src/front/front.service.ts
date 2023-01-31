import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class FrontService {
  root() {
    const indexPath = path.join(__dirname, '..', '..', 'public');
    return indexPath;
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProtectSession } from './auth/auth.middleware';
import { UserController } from './user/user.controller';
import { MessagesModule } from './messages/messages.module';
import { FrontModule } from './front/front.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MessagesModule,
    FrontModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectSession).forRoutes(UserController);
  }
}

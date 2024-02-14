import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'neecsman',
      password: 'neecsman',
      database: 'blog',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    BlogModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

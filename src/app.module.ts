import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'neecsman',
      password: 'neecsman',
      database: 'blog',
      entities: [],
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

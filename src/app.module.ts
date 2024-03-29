import { Module } from '@nestjs/common';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Birthday } from './user/entities/birthday.entity';
import { ArticleModule } from './article/article.module';
import { CommentsModule } from './comments/comments.module';
import { Article } from './article/entities/article.entity';
import { ArticleTags } from './article/entities/articleTags.entity';
import { ArticleBlock } from './article/entities/articleBlock.entity';
import { Comment } from './comments/entities/comment.entity';
import { ArticleTextBlockParagraph } from './article/entities/articleBlockParagraph.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        Birthday,
        Article,
        ArticleTags,
        ArticleBlock,
        ArticleTextBlockParagraph,
        Comment,
      ],
      synchronize: true,
    }),
    AuthModule,
    ArticleModule,
    CommentsModule,
    BlogModule,
    UserModule,
    ArticleModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

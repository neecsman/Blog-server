import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleBlock } from './entities/articleBlock.entity';

import { ArticleTags } from './entities/articleTags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleBlock, ArticleTags])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}

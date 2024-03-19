import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Response } from 'express';
import { ArticleTagsType } from './entities/articleTags.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    console.log(body);

    const createdArticle = this.articleService.create(body);
    return res.json({ status: 'ok' });
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  @Post('/tags')
  async addTag(@Body() tag: { type: ArticleTagsType }) {
    return this.articleService.addTag(tag);
  }

  @Delete('/tags')
  async deleteTags() {}
}

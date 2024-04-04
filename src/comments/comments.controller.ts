import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentData } from 'src/interfaces';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() data: CreateCommentData) {
    return this.commentsService.create(data);
  }

  @Get()
  findAll(@Query('articleId') articleId: number) {
    console.log(articleId);

    return this.commentsService.findAllByArticleId(articleId);
  }
}

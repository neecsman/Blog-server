import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentData } from 'src/interfaces';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async create(data: CreateCommentData) {
    try {
      const user = await this.userRepository.findOneBy({ id: data.userId });
      if (!user) throw new UnauthorizedException();

      const article = await this.articleRepository.findOneBy({
        id: data.articleId,
      });

      if (!article) throw new NotFoundException();

      const newComment = new Comment();
      newComment.text = data.text;
      newComment.user = user;
      newComment.article = article;
      const savedComment = await this.commentsRepository.save(newComment);

      return savedComment;
    } catch (error) {
      console.log('something wrong', error);
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

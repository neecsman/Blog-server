import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleBlock } from './entities/articleBlock.entity';

import { ArticleTags, ArticleTagsType } from './entities/articleTags.entity';
import { ArticleTextBlockParagraph } from './entities/articleBlockParagraph.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(ArticleBlock)
    private articleBlockRepository: Repository<ArticleBlock>,
    @InjectRepository(ArticleTextBlockParagraph)
    private articleTextBlockParagraphsRepository: Repository<ArticleTextBlockParagraph>,
    @InjectRepository(ArticleTags)
    private articleTagsRepository: Repository<ArticleTags>,
    @InjectRepository(User) private userService: Repository<User>,
  ) {}

  async create(articleData) {
    try {
      const article = new Article();
      const user = await this.userService.findOneBy({ id: articleData.userId });

      if (!user)
        throw new HttpException(
          'Пользователь не неайден',
          HttpStatus.UNAUTHORIZED,
        );

      article.title = articleData.title;
      article.subtitle = articleData.subtitle;
      article.img = articleData.img;
      article.author = user;

      const savedArticle = await this.articleRepository.save(article);

      const tagsPromise: Promise<ArticleTags>[] = articleData.tags.map(
        async (tag: ArticleTagsType) => {
          return await this.articleTagsRepository.findOneBy({ type: tag });
        },
      );

      const blocks: ArticleBlock[] = [];
      for (const blockData of articleData.blocks) {
        let block: ArticleBlock;

        switch (blockData.type) {
          case 'TEXT':
            const textBlock = new ArticleBlock();
            textBlock.type = blockData.type;
            textBlock.title = blockData.title;

            const savedTextBlock = await this.articleBlockRepository.save(
              textBlock,
            );

            let paragraphs: ArticleTextBlockParagraph[] = [];

            textBlock.paragraphs = blockData.paragraphs.map(
              async (paragraph: string) => {
                const newParagraph = new ArticleTextBlockParagraph();
                newParagraph.text = paragraph;
                newParagraph.articleTextBlock = savedTextBlock;
                const savedParagraph =
                  await this.articleTextBlockParagraphsRepository.save(
                    newParagraph,
                  );

                paragraphs.push(savedParagraph);
              },
            );

            savedTextBlock.article = savedArticle;
            savedTextBlock.paragraphs = paragraphs;
            block = await this.articleBlockRepository.save(textBlock);
            break;
          case 'CODE':
            const codeBlock = new ArticleBlock();
            codeBlock.type = blockData.type;
            codeBlock.code = blockData.code;
            codeBlock.article = article;
            block = await this.articleBlockRepository.save(codeBlock);
            break;
          case 'IMAGE':
            const imageBlock = new ArticleBlock();
            imageBlock.type = blockData.type;
            imageBlock.title = blockData.title;
            imageBlock.src = blockData.src;
            imageBlock.article = article;
            block = await this.articleBlockRepository.save(imageBlock);
            break;
          default:
            throw new Error(`Unknown block type: ${blockData.type}`);
        }

        blocks.push(block);
      }
      const tags = await Promise.all(tagsPromise);

      console.log(tags, blocks);

      article.tags = tags;
      article.blocks = blocks;

      await this.articleRepository.save(article);

      console.log(savedArticle);
      return savedArticle;
    } catch (error) {
      console.log(error);
    }

    return 'This action adds a new article';
  }

  async findAll() {
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.blocks', 'block')
      .leftJoinAndSelect('block.paragraphs', 'paragraph')
      .leftJoinAndSelect('article.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .orderBy('block.id', 'ASC')
      .getMany();
    return articles;
  }

  async findOne(id: number) {
    try {
      const article = await this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.author', 'author')
        .leftJoinAndSelect('article.tags', 'tag')
        .leftJoinAndSelect('article.blocks', 'block')
        .leftJoinAndSelect('block.paragraphs', 'paragraph')
        .leftJoinAndSelect('article.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'user')
        .where('article.id = :id', { id })
        .orderBy('block.id', 'ASC')
        .getOne();

      if (!article)
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);

      const formattedBlocks: ArticleBlock[] = article.blocks
        .map((block) => {
          switch (block.type) {
            case 'TEXT':
              return {
                id: block.id,
                type: block.type,
                title: block.title,
                paragraphs: block.paragraphs,
              };
            case 'CODE':
              return {
                id: block.id,
                type: block.type,
                code: block.code,
              };
            case 'IMAGE':
              return {
                id: block.id,
                type: block.type,
                title: block.title,
                src: block.src,
              };
            default:
              return null;
          }
        })
        .filter(Boolean);

      article.blocks = formattedBlocks;
      return article;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  async addTag(tag: { type: ArticleTagsType }) {
    try {
      const newTag = new ArticleTags();
      newTag.type = tag.type;

      const savedTag = await this.articleTagsRepository.save(newTag);

      return savedTag;
    } catch (error) {
      console.log(error);
    }
  }
}

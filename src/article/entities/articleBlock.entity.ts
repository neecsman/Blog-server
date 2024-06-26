import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { ArticleTextBlockParagraph } from './articleBlockParagraph.entity';

export enum BlockType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

@Entity()
export class ArticleBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: BlockType;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  src?: string;

  @ManyToOne(() => Article, (article) => article.blocks)
  article?: Article;

  @OneToMany(
    () => ArticleTextBlockParagraph,
    (paragraphs) => paragraphs.articleTextBlock,
  )
  paragraphs?: ArticleTextBlockParagraph[];
}

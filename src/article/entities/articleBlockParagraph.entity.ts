import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleBlock } from './articleBlock.entity';

@Entity()
export class ArticleTextBlockParagraph {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => ArticleBlock, (articleBlock) => articleBlock.paragraphs)
  articleTextBlock: ArticleBlock;
}

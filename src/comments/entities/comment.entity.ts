import { Article } from 'src/article/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Article, (article) => article)
  article: Article;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ArticleBlock } from './articleBlock.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ArticleTags } from './articleTags.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  img: string;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinTable()
  author: User;

  @ManyToMany(() => ArticleTags)
  @JoinTable()
  tags: ArticleTags[];

  @OneToMany(() => ArticleBlock, (articleBlock) => articleBlock.article)
  blocks: ArticleBlock[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}

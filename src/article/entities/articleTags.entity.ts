import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

export enum ArticleTagsType {
  IT = 'IT',
  SCIENCE = 'SCIENS',
  DIGITAL = 'DIGITAL',
  TECH = 'TECH',
  GAMES = 'GAMES',
  FINANCE = 'FINANCE',
}

@Entity()
export class ArticleTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ArticleTagsType;
}

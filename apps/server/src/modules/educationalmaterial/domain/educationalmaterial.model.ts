import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Educationalmaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  content?: string

  @Column({ nullable: true })
  linkUrl?: string

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

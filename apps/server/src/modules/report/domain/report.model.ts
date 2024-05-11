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

import { Assessment } from '../../../modules/assessment/domain'

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  insights?: string

  @Column({ nullable: true })
  recommendations?: string

  @Column({})
  assessmentId: string

  @ManyToOne(() => Assessment, parent => parent.reports)
  @JoinColumn({ name: 'assessmentId' })
  assessment?: Assessment

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

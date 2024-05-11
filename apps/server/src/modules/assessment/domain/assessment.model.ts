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

import { User } from '../../../modules/user/domain'

import { Report } from '../../../modules/report/domain'

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  techStackDescription?: string

  @Column({ nullable: true })
  aiReadinessLevel?: string

  @Column({ nullable: true })
  submissionDate?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.assessments)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Report, child => child.assessment)
  reports?: Report[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

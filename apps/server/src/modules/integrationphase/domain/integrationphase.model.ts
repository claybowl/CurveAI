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

@Entity()
export class Integrationphase {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  phaseDescription?: string

  @Column({ nullable: true })
  currentStatus?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.integrationphases)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

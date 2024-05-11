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

import { Technologyupdate } from '../../../modules/technologyupdate/domain'

@Entity()
export class Usertechnologyupdate {
  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.usertechnologyupdates)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  updateId: string

  @ManyToOne(
    () => Technologyupdate,
    parent => parent.usertechnologyupdatesAsUpdate,
  )
  @JoinColumn({ name: 'updateId' })
  update?: Technologyupdate

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

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

import { Usertechnologyupdate } from '../../../modules/usertechnologyupdate/domain'

@Entity()
export class Technologyupdate {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  relevance?: string

  @OneToMany(() => Usertechnologyupdate, child => child.update)
  usertechnologyupdatesAsUpdate?: Usertechnologyupdate[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

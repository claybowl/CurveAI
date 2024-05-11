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

import { Notification } from '../../../modules/notification/domain'

import { Assessment } from '../../../modules/assessment/domain'

import { Integrationphase } from '../../../modules/integrationphase/domain'

import { Usertechnologyupdate } from '../../../modules/usertechnologyupdate/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Assessment, child => child.user)
  assessments?: Assessment[]

  @OneToMany(() => Integrationphase, child => child.user)
  integrationphases?: Integrationphase[]

  @OneToMany(() => Usertechnologyupdate, child => child.user)
  usertechnologyupdates?: Usertechnologyupdate[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

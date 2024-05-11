import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UsertechnologyupdateCreateDto {
  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  updateId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class UsertechnologyupdateUpdateDto {
  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  updateId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

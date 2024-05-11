import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TechnologyupdateCreateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  relevance?: string

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

export class TechnologyupdateUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  relevance?: string

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

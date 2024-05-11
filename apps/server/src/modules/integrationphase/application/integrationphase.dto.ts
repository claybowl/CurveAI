import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class IntegrationphaseCreateDto {
  @IsString()
  @IsOptional()
  phaseDescription?: string

  @IsString()
  @IsOptional()
  currentStatus?: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class IntegrationphaseUpdateDto {
  @IsString()
  @IsOptional()
  phaseDescription?: string

  @IsString()
  @IsOptional()
  currentStatus?: string

  @IsString()
  @IsOptional()
  userId?: string

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

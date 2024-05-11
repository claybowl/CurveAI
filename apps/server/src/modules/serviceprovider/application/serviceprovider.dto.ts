import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ServiceproviderCreateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  serviceDescription?: string

  @IsString()
  @IsOptional()
  contactInfo?: string

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

export class ServiceproviderUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  serviceDescription?: string

  @IsString()
  @IsOptional()
  contactInfo?: string

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

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ReportCreateDto {
  @IsString()
  @IsOptional()
  insights?: string

  @IsString()
  @IsOptional()
  recommendations?: string

  @IsString()
  @IsOptional()
  assessmentId?: string

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

export class ReportUpdateDto {
  @IsString()
  @IsOptional()
  insights?: string

  @IsString()
  @IsOptional()
  recommendations?: string

  @IsString()
  @IsOptional()
  assessmentId?: string

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

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AssessmentCreateDto {
  @IsString()
  @IsOptional()
  techStackDescription?: string

  @IsString()
  @IsOptional()
  aiReadinessLevel?: string

  @IsString()
  @IsOptional()
  submissionDate?: string

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

export class AssessmentUpdateDto {
  @IsString()
  @IsOptional()
  techStackDescription?: string

  @IsString()
  @IsOptional()
  aiReadinessLevel?: string

  @IsString()
  @IsOptional()
  submissionDate?: string

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

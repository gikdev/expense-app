import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import {Exclude, Expose}from "class-transformer"
import { ReportType } from "src/data"

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: string

  @IsNotEmpty()
  @IsString()
  source: string
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  source?: string
}

export class ReportResponseDto {
  id: string
  source: string
  amount: number
  created_at: Date

  @Exclude()
  updated_at: Date
  type: ReportType

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial)
  }
}

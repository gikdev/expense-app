import { Exclude, Expose } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import { ReportType } from "src/data"

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number

  @IsNotEmpty()
  @IsString()
  source: string
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  source: string
}

export class ReportResponseDto {
  id: string
  source: string
  amount: number

  @Expose({ name: "createdAt" })
  transformCreateAt() {
    return this.created_at
  }

  @Exclude()
  created_at: Date

  @Exclude()
  updated_at: Date
  type: ReportType

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial)
  }
}

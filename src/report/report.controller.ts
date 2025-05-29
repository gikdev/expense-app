import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { ReportType, _Report } from "../data"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "../dtos/report.dto"
import { ReportService } from "./report.service"

@Controller("report/:type")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({
    summary: "Get all reports",
  })
  getAllReports(@Param("type", new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
    return this.reportService.getAllReports(type as ReportType)
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a report by ID",
  })
  getReportById(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(type as ReportType, id)
  }

  @Post()
  @ApiOperation({
    summary: "Creates a report",
  })
  createReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: "expense" | "income",
    @Body() { amount, source }: CreateReportDto,
  ): ReportResponseDto {
    return this.reportService.createReport(type as ReportType, { amount, source })
  }

  @Put(":id")
  @ApiOperation({
    summary: "Updates a report by ID",
  })
  updateReportById(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("type", new ParseEnumPipe(ReportType)) type: "expense" | "income",
    @Body() { amount, source }: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateReportById(id, type as ReportType, { amount, source })
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a report by ID",
  })
  deleteReportById(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("type", new ParseEnumPipe(ReportType)) type: "expense" | "income",
  ) {
    return this.reportService.deleteReportById(id, type as ReportType)
  }
}

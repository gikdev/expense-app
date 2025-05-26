import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { AppService } from "./app.service"
import { _Report, data } from "./data"

@Controller("report/:type")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "Get all reports",
  })
  getAllReports(@Param("type") type: string) {
    return this.appService.getAllReports(type as _Report["type"])
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a report by ID",
  })
  getReportById(@Param("type") type: string, @Param("id") id: string) {
    return this.appService.getReportById(type as _Report["type"], id)
  }

  @Post()
  @ApiOperation({
    summary: "Creates a report",
  })
  createReport(
    @Param("type") type: "expense" | "income",
    @Body() { amount, source }: Pick<_Report, "amount" | "source">,
  ) {
    return this.appService.createReport(type, { amount, source })
  }

  @Put(":id")
  @ApiOperation({
    summary: "Updates a report by ID",
  })
  updateReportById(
    @Param("id") id: string,
    @Param("type") type: "expense" | "income",
    @Body() { amount, source }: Pick<_Report, "amount" | "source">,
  ) {
    return this.appService.updateReportById(id, type, { amount, source })
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a report by ID",
  })
  deleteReportById(@Param("id") id: string, @Param("type") type: "expense" | "income") {
    return this.appService.deleteReportById(id, type)
  }
}

import { Controller, Delete, Get, Post, Put } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"

@Controller("report/:type")
export class AppController {
  @Get()
  @ApiOperation({
    summary: "Get all reports",
  })
  getAllReports() {
    return []
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a report by ID",
  })
  getIncomeById() {
    return {}
  }

  @Post()
  @ApiOperation({
    summary: "Creates a report",
  })
  createReport() {
    return "created"
  }

  @Put(":id")
  @ApiOperation({
    summary: "Updates a report by ID",
  })
  updateReportById() {
    return "updated"
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a report by ID",
  })
  deleteReportById() {
    return "deleted"
  }
}

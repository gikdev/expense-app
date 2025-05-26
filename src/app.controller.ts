import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { v4 as uuid } from "uuid"
import { _Report, data } from "./data"

@Controller("report/:type")
export class AppController {
  @Get()
  @ApiOperation({
    summary: "Get all reports",
  })
  getAllReports(@Param("type") type: string) {
    return data.reports.filter(r => r.type === type)
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a report by ID",
  })
  getIncomeById(@Param("type") type: string, @Param("id") id: string) {
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    return foundReport
  }

  @Post()
  @ApiOperation({
    summary: "Creates a report",
  })
  createReport(
    @Param("type") type: "expense" | "income",
    @Body() { amount, source }: Pick<_Report, "amount" | "source">,
  ) {
    const newReport: _Report = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }

    data.reports.push(newReport)

    return newReport
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
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    foundReport.amount = amount
    foundReport.source = source
    foundReport.updated_at = new Date()

    return foundReport
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Deletes a report by ID",
  })
  deleteReportById(@Param("id") id: string, @Param("type") type: "expense" | "income") {
    const foundIndex = data.reports.filter(r => r.type === type).findIndex(r => r.id === id)
    if (foundIndex === -1) throw new NotFoundException("No report by this type/id was found!")
    const deletedItem = data.reports[foundIndex]
    data.reports = [...data.reports.filter(r => r.id !== id)]

    return deletedItem
  }
}

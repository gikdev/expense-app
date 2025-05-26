import { Injectable, NotFoundException } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { _Report, data } from "./data"

@Injectable()
export class AppService {
  getAllReports(type: _Report["type"]) {
    return data.reports.filter(r => r.type === type)
  }

  getReportById(type: _Report["type"], id: _Report["id"]) {
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    return foundReport
  }

  createReport(type: _Report["type"], { amount, source }: Pick<_Report, "amount" | "source">) {
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

  updateReportById(
    id: string,
    type: _Report["type"],
    { amount, source }: Pick<_Report, "amount" | "source">,
  ) {
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    foundReport.amount = amount
    foundReport.source = source
    foundReport.updated_at = new Date()

    return foundReport
  }

  deleteReportById(id: string, type: _Report["type"]) {
    const foundIndex = data.reports.filter(r => r.type === type).findIndex(r => r.id === id)
    if (foundIndex === -1) throw new NotFoundException("No report by this type/id was found!")
    const deletedItem = data.reports[foundIndex]
    data.reports = [...data.reports.filter(r => r.id !== id)]

    return deletedItem
  }
}

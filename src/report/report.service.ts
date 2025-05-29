import { Injectable, NotFoundException } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { ReportType, _Report, data } from "../data"
import { ReportResponseDto } from "../dtos/report.dto"

@Injectable()
export class ReportService {
  getAllReports(type: ReportType) {
    return data.reports.filter(r => r.type === type).map(r => new ReportResponseDto(r))
  }

  getReportById(type: ReportType, id: _Report["id"]) {
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    return new ReportResponseDto(foundReport)
  }

  createReport(type: ReportType, { amount, source }: Pick<_Report, "amount" | "source">) {
    const newReport: _Report = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }

    data.reports.push(newReport)

    return new ReportResponseDto(newReport)
  }

  updateReportById(
    id: string,
    type: ReportType,
    { amount, source }: Partial<Pick<_Report, "amount" | "source">>,
  ) {
    const foundReport = data.reports.filter(r => r.type === type).find(r => r.id === id)
    if (!foundReport) throw new NotFoundException("No report by this type/id was found!")
    if (amount) foundReport.amount = amount
    if (source) foundReport.source = source
    foundReport.updated_at = new Date()

    return new ReportResponseDto(foundReport)
  }

  deleteReportById(id: string, type: ReportType) {
    const foundIndex = data.reports.filter(r => r.type === type).findIndex(r => r.id === id)
    if (foundIndex === -1) throw new NotFoundException("No report by this type/id was found!")
    data.reports = [...data.reports.filter(r => r.id !== id)]
  }
}

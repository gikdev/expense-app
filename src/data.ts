export enum ReportType {
  Expense = "expense",
  Income = "income",
}

export interface _Report {
  id: string
  source: string
  amount: number
  created_at: Date
  updated_at: Date
  type: ReportType
}

interface Data {
  reports: _Report[]
}

const DUMMY_REPORTS: _Report[] = [
  {
    id: "uuid1",
    source: "Salary",
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Income,
  },
  {
    id: "uuid2",
    source: "YouTube",
    amount: 2500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Income,
  },
  {
    id: "uuid3",
    source: "Food",
    amount: 500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.Expense,
  },
]

export const data: Data = {
  reports: [...DUMMY_REPORTS],
}

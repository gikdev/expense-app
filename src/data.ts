export interface _Report {
  id: string
  source: string
  amount: number
  created_at: Date
  updated_at: Date
  type: "expense" | "income"
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
    type: "income",
  },
  {
    id: "uuid2",
    source: "YouTube",
    amount: 2500,
    created_at: new Date(),
    updated_at: new Date(),
    type: "income",
  },
  {
    id: "uuid3",
    source: "Food",
    amount: 500,
    created_at: new Date(),
    updated_at: new Date(),
    type: "expense",
  },
]

export const data: Data = {
  reports: [...DUMMY_REPORTS],
}

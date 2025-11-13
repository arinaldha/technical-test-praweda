export type PeriodMaintenanceDetail = {
    id: string
    period_maintenance_id: string
    period_code: number
    period_description: number
    period_start_date: string
    period_end_date: string
    billing_closed: number
    estimation_closed: number
    financial_closed: number
    period_maintenance: Nullable<PeriodMaintenance>
  }
  
  export type PeriodMaintenance = {
    company_id: string
    company: Nullable<Company>
    yr_code: number
    yr_description: string
    yr_start_date: string
    yr_end_date: string
  }
  
  export type Company = {
    company_code: string
    company_name: string
  }
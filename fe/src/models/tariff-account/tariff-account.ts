export type TariffAccount = {
  id: string
  tariff_start_date: string
  tariff_end_date: string
  tariff_desc: string
  status: number
  tariff_account_details: TariffAccountDetail[]
}

export type TariffAccountDetail = {
  id: string
  tariff_account_id: string
  service_id: string
  service: Service
  tariff_type_id: string
  tariff_type: string
  currency_id: string
  currency: Currency
  tariff_amount: number
  tariff_remarks?: string
  min_qty: number
  max_qty: number
  lumpsum_flag: boolean
}

export type Service = {
  service_code: string
  service_name: string
  additional_config_components: Nullable<string>
}

export type Currency = {
  currency_code: string
  currency_name: string
}

export interface TariffLicenseDaumResponse {
  id: string
  tariff_license_id: string
  currency_id: string
  currency: Currency
  server_license_id: string
  server_license: ServerLicense
  tariff_amount: number
}

export interface ServerLicense {
  server_license_code: string
  server_license_name: string
}

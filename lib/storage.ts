import type { CompanySiteData } from './types'

const STORAGE_KEY = 'sitegen-company-data'

export function saveCompanyData(data: CompanySiteData): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function loadCompanyData(): CompanySiteData | null {
  if (typeof window !== 'undefined') {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        return JSON.parse(raw) as CompanySiteData
      } catch {
        return null
      }
    }
  }
  return null
}

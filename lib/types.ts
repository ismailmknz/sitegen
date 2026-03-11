export interface CompanySiteData {
  companyName: string
  sector: string
  services: string[]
  primaryColor: string
  secondaryColor: string
}

export const DEFAULT_SITE_DATA: CompanySiteData = {
  companyName: 'Votre Entreprise',
  sector: 'Services professionnels',
  services: ['Conseil', 'Support', 'Formation'],
  primaryColor: '#0f172a',
  secondaryColor: '#3b82f6',
}

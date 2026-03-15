'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { saveCompanyData } from '@/lib/storage'
import type { CompanySiteData } from '@/lib/types'

const SECTOR_OPTIONS = [
  'Technologie',
  'Santé',
  'Finance',
  'Commerce',
  'Restauration',
  'Construction',
  'Services professionnels',
  'Éducation',
  'Autre',
]

export default function FormPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [companyName, setCompanyName] = useState('')
  const [sector, setSector] = useState('')
  const [servicesText, setServicesText] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#0f172a')
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6')
  const [error, setError] = useState('')

  const services = servicesText
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!companyName.trim()) {
      setError('Veuillez entrer le nom de votre entreprise.')
      return
    }
    if (!sector) {
      setError('Veuillez sélectionner un secteur.')
      return
    }
    if (services.length === 0) {
      setError('Veuillez indiquer au moins un service (séparés par des virgules).')
      return
    }

    const data: CompanySiteData = {
      companyName: companyName.trim(),
      sector,
      services,
      primaryColor,
      secondaryColor,
    }
    saveCompanyData(data)
    router.push('/site')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-pulse text-slate-500">Chargement…</div>
      </div>
    )
  }

  if (!user) {
    router.replace('/login?redirect=/form')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-800 tracking-tight hover:text-slate-600">
            SiteGen
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { void signOut(); router.push('/') }}
              className="rounded-lg border border-slate-200 bg-white text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Créez votre site web</h1>
        <p className="mt-2 text-slate-600">Remplissez les champs ci-dessous pour générer votre site professionnel.</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-slate-700">
              Nom de l&apos;entreprise *
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex : Tech Solutions"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
            />
          </div>

          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-slate-700">
              Secteur d&apos;activité *
            </label>
            <select
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              <option value="">Sélectionnez un secteur</option>
              {SECTOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="services" className="block text-sm font-medium text-slate-700">
              Services (séparés par des virgules) *
            </label>
            <textarea
              id="services"
              rows={4}
              value={servicesText}
              onChange={(e) => setServicesText(e.target.value)}
              placeholder="Ex : Conseil, Développement web, Support technique"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700">
                Couleur principale
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-14 rounded border border-slate-300 cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-700 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                />
              </div>
            </div>
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-slate-700">
                Couleur secondaire
              </label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 w-14 rounded border border-slate-300 cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-700 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="rounded-xl bg-slate-800 text-white px-8 py-4 text-base font-semibold hover:bg-slate-700 transition-colors shadow-lg shadow-slate-800/20"
            >
              Générer mon site
            </button>
            <Link
              href="/"
              className="rounded-xl border-2 border-slate-200 bg-white text-slate-700 px-8 py-4 text-base font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors text-center"
            >
              Annuler
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

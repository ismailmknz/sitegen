'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadCompanyData } from '@/lib/storage'
import { DEFAULT_SITE_DATA, type CompanySiteData } from '@/lib/types'

function GeneratedSite({ data }: { data: CompanySiteData }) {
  const primary = data.primaryColor
  const secondary = data.secondaryColor

  return (
    <div
      className="min-h-screen"
      style={
        {
          '--color-primary': primary,
          '--color-secondary': secondary,
        } as React.CSSProperties
      }
    >
      {/* Barre de retour (hors du site généré) */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-slate-800 text-white text-sm shadow-md">
        <span className="font-medium">Aperçu généré par SiteGen</span>
        <div className="flex gap-2">
          <Link
            href="/form"
            className="rounded bg-white/20 px-3 py-1.5 hover:bg-white/30 transition-colors"
          >
            Modifier
          </Link>
          <Link
            href="/"
            className="rounded bg-white/20 px-3 py-1.5 hover:bg-white/30 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>

      {/* En-tête du site généré */}
      <header
        className="py-16 px-6 sm:px-12 text-white"
        style={{ backgroundColor: primary }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {data.companyName}
          </h1>
          <p className="mt-4 text-lg opacity-90">{data.sector}</p>
          <p className="mt-6 text-white/90 max-w-2xl mx-auto">
            Bienvenue sur notre site. Découvrez nos services et n&apos;hésitez pas à nous contacter.
          </p>
        </div>
      </header>

      {/* Section Services */}
      <section className="py-16 px-6 sm:px-12 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            Nos services
          </h2>
          <p className="mt-2 text-slate-600 text-center">
            Des solutions adaptées à vos besoins.
          </p>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((service, i) => (
              <li
                key={i}
                className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: secondary }}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{service}</h3>
                <p className="mt-2 text-slate-600 text-sm">
                  Nous vous accompagnons avec professionnalisme et réactivité.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-6 sm:px-12 text-white"
        style={{ backgroundColor: secondary }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Prêt à nous rejoindre ?</h2>
          <p className="mt-4 opacity-90">
            Contactez-nous pour en savoir plus sur nos services.
          </p>
          <a
            href="#"
            className="inline-block mt-6 rounded-xl bg-white px-8 py-4 font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>

      {/* Pied de page */}
      <footer
        className="py-8 px-6 sm:px-12 text-white text-center text-sm"
        style={{ backgroundColor: primary }}
      >
        <p>© {new Date().getFullYear()} {data.companyName}. Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default function SitePage() {
  const [data, setData] = useState<CompanySiteData | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loaded = loadCompanyData()
    setData(loaded ?? DEFAULT_SITE_DATA)
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-pulse text-slate-500">Chargement...</div>
      </div>
    )
  }

  return <GeneratedSite data={data ?? DEFAULT_SITE_DATA} />
}

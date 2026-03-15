'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useAuth } from '@/components/AuthProvider'

function HeaderActions() {
  const { user, signOut } = useAuth()

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600 hidden sm:inline">
          Connecté en tant que <span className="font-medium text-slate-900">{user.email}</span>
        </span>
        <button
          type="button"
          onClick={() => { void signOut() }}
          className="rounded-lg border border-slate-200 bg-white text-slate-700 px-3 py-2 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Se déconnecter
        </button>
        <Link
          href="/form"
          className="rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          Créer mon site
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-lg border border-slate-200 bg-white text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        Se connecter
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-medium hover:bg-slate-700 transition-colors"
      >
        S&apos;inscrire
      </Link>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-800 tracking-tight">SiteGen</span>
          <Suspense fallback={null}>
            <HeaderActions />
          </Suspense>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Votre site web professionnel en quelques minutes
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Remplissez un formulaire simple avec le nom de votre entreprise, votre secteur,
            vos services et vos couleurs. Nous générons pour vous un site web prêt à l&apos;emploi.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-xl bg-slate-800 text-white px-8 py-4 text-base font-semibold hover:bg-slate-700 transition-colors shadow-lg shadow-slate-800/20"
            >
              Commencer maintenant
            </Link>
            <Link
              href="/site"
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-700 px-8 py-4 text-base font-semibold hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Voir un exemple
            </Link>
          </div>
        </div>

        <div className="mt-24 grid sm:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xl font-bold">1</div>
            <h3 className="mt-4 font-semibold text-slate-900">Remplissez le formulaire</h3>
            <p className="mt-2 text-slate-600 text-sm">Nom, secteur, services et couleurs de votre entreprise.</p>
          </div>
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xl font-bold">2</div>
            <h3 className="mt-4 font-semibold text-slate-900">Génération automatique</h3>
            <p className="mt-2 text-slate-600 text-sm">Votre site est créé instantanément et personnalisé.</p>
          </div>
          <div className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xl font-bold">3</div>
            <h3 className="mt-4 font-semibold text-slate-900">Prêt à publier</h3>
            <p className="mt-2 text-slate-600 text-sm">Téléchargez ou partagez votre nouveau site web.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200/80 mt-24 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} SiteGen. Générateur de sites web professionnels.
        </div>
      </footer>
    </div>
  )
}

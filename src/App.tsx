import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { SocialProof } from './components/sections/SocialProof'
import { ProblemSolution } from './components/sections/ProblemSolution'
import { Differentials } from './components/sections/Differentials'
import { UseCases } from './components/sections/UseCases'
import { HowItWorks } from './components/sections/HowItWorks'
import { Testimonials } from './components/sections/Testimonials'
import { Personas } from './components/sections/Personas'
import { Integrations } from './components/sections/Integrations'
import { Metrics } from './components/sections/Metrics'
import { FAQ } from './components/sections/FAQ'
import { CTAFinal } from './components/sections/CTAFinal'
import { Footer } from './components/sections/Footer'
import { StickyMobileCTA } from './components/common/StickyMobileCTA'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <>
      <Helmet>
        <title>ProceX AI - Agentes de IA Personalizados em 14 Dias</title>
        <meta
          name="description"
          content="Agentes de IA Personalizados em 14 Dias para PMEs. Automatize processos, reduza custos e multiplique sua produtividade."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ProceX AI',
            description: 'Agentes de IA Personalizados para PMEs',
            url: 'https://procex.ai',
            logo: 'https://procex.ai/logo.svg',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales',
              availableLanguage: 'Portuguese',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '50',
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-neutral-beige dark:bg-gray-900 transition-colors">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero />
          <SocialProof />
          <ProblemSolution />
          <Differentials />
          <UseCases />
          <HowItWorks />
          <Testimonials />
          <Personas />
          <Integrations />
          <Metrics />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />

        {/* Sticky mobile CTA bar - Appears after 800px scroll on mobile */}
        <StickyMobileCTA
          scrollThreshold={800}
          buttonText="AGENDAR DIAGNÓSTICO"
          message="Descubra como otimizar seus dados"
        />
      </div>
    </>
  )
}

export default App

// Google Analytics 4 Helper Functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || ''

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return

  // Create script tag
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script1)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  })
}

// Track page view
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Pre-defined events for common actions
export const trackEvent = {
  // CTA Clicks
  ctaClick: (location: string) => {
    event({
      action: 'cta_click',
      category: 'Engagement',
      label: location,
      value: 1,
    })
  },

  // Button Clicks
  buttonClick: (buttonName: string) => {
    event({
      action: 'button_click',
      category: 'Engagement',
      label: buttonName,
      value: 1,
    })
  },

  // Section Views
  sectionView: (sectionName: string) => {
    event({
      action: 'section_view',
      category: 'Engagement',
      label: sectionName,
    })
  },

  // Form Events
  formStart: () => {
    event({
      action: 'form_start',
      category: 'Contact',
      label: 'Contact Form',
    })
  },

  formSubmit: () => {
    event({
      action: 'form_submit',
      category: 'Contact',
      label: 'Contact Form',
      value: 1,
    })
  },

  formError: (errorField: string) => {
    event({
      action: 'form_error',
      category: 'Contact',
      label: errorField,
    })
  },

  // External Links
  externalLink: (url: string) => {
    event({
      action: 'external_link',
      category: 'Outbound',
      label: url,
    })
  },

  // WhatsApp Click
  whatsappClick: (location: string) => {
    event({
      action: 'whatsapp_click',
      category: 'Contact',
      label: location,
      value: 1,
    })
  },

  // Newsletter Signup
  newsletterSignup: () => {
    event({
      action: 'newsletter_signup',
      category: 'Lead',
      value: 1,
    })
  },

  // Download (if applicable)
  download: (fileName: string) => {
    event({
      action: 'download',
      category: 'Engagement',
      label: fileName,
    })
  },

  // Video Play
  videoPlay: (videoName: string) => {
    event({
      action: 'video_play',
      category: 'Engagement',
      label: videoName,
    })
  },

  // Scroll Depth
  scrollDepth: (percentage: number) => {
    event({
      action: 'scroll_depth',
      category: 'Engagement',
      label: `${percentage}%`,
      value: percentage,
    })
  },

  // Time on Page
  timeOnPage: (seconds: number) => {
    event({
      action: 'time_on_page',
      category: 'Engagement',
      value: seconds,
    })
  },
}

// Hook for scroll depth tracking
export const useScrollDepthTracking = () => {
  if (typeof window === 'undefined') return

  const milestones = [25, 50, 75, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100

    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone)
        trackEvent.scrollDepth(milestone)
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

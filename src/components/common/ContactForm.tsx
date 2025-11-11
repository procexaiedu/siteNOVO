import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^[\d\s\-\(\)]+$/, 'Telefone inválido'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
  employees: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  onSuccess?: () => void
  className?: string
}

export function ContactForm({ onSuccess, className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Simular envio (substituir por API real)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Aqui você integraria com:
      // - Seu backend
      // - API de email (SendGrid, Mailgun)
      // - CRM (HubSpot, Pipedrive)
      // - Google Sheets
      console.log('Form data:', data)

      // Google Analytics Event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1,
        })
      }

      setIsSuccess(true)
      reset()
      onSuccess?.()

      // Reset success message após 5s
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-primary-dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <Input
              label="Nome Completo *"
              {...register('name')}
              error={errors.name?.message}
              placeholder="João Silva"
              disabled={isSubmitting}
              inputMode="text"
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email Profissional *"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="joao@empresa.com"
              disabled={isSubmitting}
              inputMode="email"
              autoComplete="email"
            />
          </div>

          {/* Telefone */}
          <div>
            <Input
              label="Telefone/WhatsApp *"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="(11) 98765-4321"
              disabled={isSubmitting}
              inputMode="tel"
              autoComplete="tel"
            />
          </div>

          {/* Empresa */}
          <div>
            <Input
              label="Empresa *"
              {...register('company')}
              error={errors.company?.message}
              placeholder="Nome da Empresa"
              disabled={isSubmitting}
              inputMode="text"
              autoComplete="organization"
            />
          </div>
        </div>

        {/* Número de funcionários */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Número de Funcionários
          </label>
          <select
            {...register('employees')}
            disabled={isSubmitting}
            className="w-full px-4 py-2 md:py-2 border-2 border-primary-dark rounded bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal min-h-[44px] md:min-h-auto"
            autoComplete="organization-type"
          >
            <option value="">Selecione...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Mensagem *
          </label>
          <textarea
            {...register('message')}
            disabled={isSubmitting}
            rows={4}
            placeholder="Conte-nos sobre seu desafio e como podemos ajudar..."
            className={`w-full px-4 py-2 border-2 rounded bg-white dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 min-h-[120px] md:min-h-[100px] ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-primary-dark focus:ring-accent-teal'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded text-green-800 dark:text-green-100"
          >
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-medium">
              Obrigado! Entraremos em contato em até 24h.
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ENVIANDO...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              AGENDAR DIAGNÓSTICO GRATUITO
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ao enviar, você concorda com nossa{' '}
          <a href="/privacy" className="underline hover:text-accent-teal">
            Política de Privacidade
          </a>{' '}
          e{' '}
          <a href="/terms" className="underline hover:text-accent-teal">
            Termos de Uso
          </a>
        </p>
      </form>
    </motion.div>
  )
}

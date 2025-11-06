/**
 * EXEMPLOS DE USO DOS COMPONENTES UI
 *
 * Este arquivo demonstra como usar cada componente criado.
 * Copie e cole os exemplos conforme necessário.
 */

import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Badge,
  BadgeGroup,
  Container,
  Section,
  Hero,
} from './src/components/ui';

// =====================================================
// EXEMPLO 1: HERO SECTION (MotherDuck Style)
// =====================================================
export const HeroExample = () => (
  <Hero>
    <h1 className="font-aeonik-mono text-hero leading-hero tracking-hero uppercase text-primary-dark mb-8">
      MAKING BIG DATA
      <br />
      FEEL SMALL
    </h1>
    <p className="font-aeonik-mono text-base uppercase tracking-wide text-primary-dark mb-8 max-w-2xl">
      DUCKDB CLOUD DATA WAREHOUSE SCALING TO TERABYTES
      <br />
      FOR CUSTOMER-FACING ANALYTICS AND BI
    </p>
    <div className="flex gap-10 items-center">
      <Button>TRY 21 DAYS FREE</Button>
      <div className="flex gap-8">
        <Button variant="link" href="/learn">
          LEARN MORE
        </Button>
        <Button variant="link" href="/demo">
          BOOK A DEMO
        </Button>
      </div>
    </div>
  </Hero>
);

// =====================================================
// EXEMPLO 2: FEATURES SECTION COM CARDS
// =====================================================
export const FeaturesExample = () => (
  <Section vertical="lg">
    <Container size="lg">
      <h2 className="font-aeonik-mono text-3xl uppercase mb-12 text-center text-primary-dark">
        OUR FEATURES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Card 1 */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>FAST QUERIES</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-dark">
              Lightning-fast analytics on massive datasets with DuckDB's
              columnar engine optimized for OLAP workloads.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="accent">PERFORMANCE</Badge>
          </CardFooter>
        </Card>

        {/* Feature Card 2 */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>EASY SCALING</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-dark">
              Scale from gigabytes to terabytes seamlessly without
              infrastructure complexity.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="accent">SCALABLE</Badge>
          </CardFooter>
        </Card>

        {/* Feature Card 3 */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>SQL NATIVE</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary-dark">
              Use standard SQL you already know. No proprietary query
              languages or complex DSLs.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="accent">DEVELOPER-FRIENDLY</Badge>
          </CardFooter>
        </Card>
      </div>
    </Container>
  </Section>
);

// =====================================================
// EXEMPLO 3: FORMULÁRIO DE CONTATO
// =====================================================
export const ContactFormExample = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Section vertical="lg">
      <Container size="md">
        <Card padding="lg">
          <CardHeader>
            <CardTitle>CONTACT US</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                error={errors.name}
                placeholder="John Doe"
                fullWidth
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                placeholder="john@company.com"
                fullWidth
              />

              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Inc."
                helperText="Optional"
                fullWidth
              />

              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your use case..."
                rows={5}
                helperText="Describe your analytics needs"
                fullWidth
              />

              <div className="flex gap-4">
                <Button type="submit">SEND MESSAGE</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setFormData({ name: '', email: '', company: '', message: '' });
                    setErrors({});
                  }}
                >
                  RESET
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
};

// =====================================================
// EXEMPLO 4: PRICING SECTION COM BADGES
// =====================================================
export const PricingExample = () => (
  <Section vertical="xl">
    <Container size="lg">
      <h2 className="font-aeonik-mono text-3xl uppercase mb-12 text-center text-primary-dark">
        PRICING PLANS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>STARTER</CardTitle>
              <Badge variant="secondary">FREE</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="font-aeonik-mono text-4xl text-primary-dark">$0</span>
              <span className="font-inter text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 font-inter text-sm">
              <li>✓ Up to 10GB storage</li>
              <li>✓ Basic analytics</li>
              <li>✓ Community support</li>
              <li>✓ 1 user</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              GET STARTED
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card variant="elevated" className="border-accent-teal">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>PROFESSIONAL</CardTitle>
              <Badge variant="accent">POPULAR</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="font-aeonik-mono text-4xl text-primary-dark">$99</span>
              <span className="font-inter text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 font-inter text-sm">
              <li>✓ Up to 1TB storage</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ Unlimited users</li>
              <li>✓ API access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">START FREE TRIAL</Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>ENTERPRISE</CardTitle>
              <Badge variant="outline">CUSTOM</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="font-aeonik-mono text-2xl text-primary-dark">
                CONTACT US
              </span>
            </div>
            <ul className="space-y-3 font-inter text-sm">
              <li>✓ Unlimited storage</li>
              <li>✓ Custom analytics</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
              <li>✓ On-premise option</li>
              <li>✓ Custom integrations</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              CONTACT SALES
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  </Section>
);

// =====================================================
// EXEMPLO 5: TESTIMONIALS COM STATUS BADGES
// =====================================================
export const TestimonialsExample = () => (
  <Section vertical="lg" className="bg-white">
    <Container size="lg">
      <h2 className="font-aeonik-mono text-3xl uppercase mb-12 text-center text-primary-dark">
        CUSTOMER SUCCESS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardContent className="space-y-4">
            <BadgeGroup>
              <Badge variant="accent" size="sm">VERIFIED</Badge>
              <Badge variant="warning" size="sm">BETA TESTER</Badge>
            </BadgeGroup>
            <p className="font-inter text-primary-dark italic">
              "MotherDuck transformed how we handle analytics. Query times
              went from minutes to seconds."
            </p>
            <div>
              <p className="font-aeonik-mono text-sm text-primary-dark">SARAH CHEN</p>
              <p className="font-inter text-xs text-gray-600">
                VP of Engineering, DataCorp
              </p>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="space-y-4">
            <BadgeGroup>
              <Badge variant="accent" size="sm">VERIFIED</Badge>
              <Badge variant="success" size="sm">ENTERPRISE</Badge>
            </BadgeGroup>
            <p className="font-inter text-primary-dark italic">
              "Scaling from GB to TB was seamless. The SQL-native approach
              meant zero learning curve for our team."
            </p>
            <div>
              <p className="font-aeonik-mono text-sm text-primary-dark">MICHAEL RODRIGUEZ</p>
              <p className="font-inter text-xs text-gray-600">
                CTO, Analytics Inc
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  </Section>
);

// =====================================================
// EXEMPLO 6: CTA SECTION
// =====================================================
export const CTAExample = () => (
  <Section vertical="xl" className="bg-primary-dark">
    <Container size="md">
      <div className="text-center space-y-8">
        <h2 className="font-aeonik-mono text-4xl uppercase text-white">
          READY TO GET STARTED?
        </h2>
        <p className="font-inter text-lg text-neutral-beige max-w-xl mx-auto">
          Try MotherDuck free for 21 days. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg">START FREE TRIAL</Button>
          <Button variant="secondary" size="lg" className="bg-white">
            BOOK A DEMO
          </Button>
        </div>
        <BadgeGroup className="justify-center">
          <Badge variant="secondary" size="sm">NO CREDIT CARD</Badge>
          <Badge variant="secondary" size="sm">21-DAY TRIAL</Badge>
          <Badge variant="secondary" size="sm">CANCEL ANYTIME</Badge>
        </BadgeGroup>
      </div>
    </Container>
  </Section>
);

// =====================================================
// EXEMPLO 7: STATS SECTION
// =====================================================
export const StatsExample = () => (
  <Section vertical="lg">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card padding="lg" className="text-center">
          <div className="font-aeonik-mono text-5xl text-accent-teal mb-2">
            10TB+
          </div>
          <div className="font-aeonik-mono text-sm uppercase text-primary-dark">
            DATA PROCESSED
          </div>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="font-aeonik-mono text-5xl text-accent-teal mb-2">
            99.9%
          </div>
          <div className="font-aeonik-mono text-sm uppercase text-primary-dark">
            UPTIME SLA
          </div>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="font-aeonik-mono text-5xl text-accent-teal mb-2">
            1000+
          </div>
          <div className="font-aeonik-mono text-sm uppercase text-primary-dark">
            CUSTOMERS
          </div>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="font-aeonik-mono text-5xl text-accent-teal mb-2">
            24/7
          </div>
          <div className="font-aeonik-mono text-sm uppercase text-primary-dark">
            SUPPORT
          </div>
        </Card>
      </div>
    </Container>
  </Section>
);

// =====================================================
// EXEMPLO COMPLETO: LANDING PAGE
// =====================================================
export const CompleteLandingPage = () => (
  <div className="min-h-screen bg-neutral-beige">
    <HeroExample />
    <FeaturesExample />
    <StatsExample />
    <PricingExample />
    <TestimonialsExample />
    <ContactFormExample />
    <CTAExample />
  </div>
);

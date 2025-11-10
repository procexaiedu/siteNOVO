/**
 * UI Components Showcase
 *
 * Demonstration page showing all base UI components
 * and their variants. Useful for:
 * - Visual testing
 * - Component documentation
 * - Design system reference
 *
 * Usage: Import this component in your App.tsx to preview all components
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
} from './index';

export const UIShowcase: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(!inputValue);
  };

  return (
    <div className="min-h-screen bg-neutral-beige">
      {/* Hero Section Example */}
      <Hero>
        <h1 className="font-aeonik-mono text-hero leading-hero tracking-hero uppercase text-primary-dark mb-8">
          UI COMPONENTS
          <br />
          SHOWCASE
        </h1>
        <p className="font-aeonik-mono text-base uppercase tracking-wide text-primary-dark mb-8 max-w-2xl">
          Complete collection of reusable components following the MotherDuck
          design system with TypeScript and Tailwind CSS
        </p>
        <div className="flex gap-4">
          <Button>PRIMARY BUTTON</Button>
          <Button variant="secondary">SECONDARY BUTTON</Button>
          <Button variant="link" href="#buttons">
            LINK BUTTON
          </Button>
        </div>
      </Hero>

      {/* Buttons Section */}
      <Section id="buttons">
        <h2 className="font-aeonik-mono text-2xl uppercase mb-6 text-primary-dark">
          1. Button Component
        </h2>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Primary Buttons */}
              <div>
                <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                  Primary (Blue Background)
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">SMALL</Button>
                  <Button>DEFAULT SIZE</Button>
                  <Button size="lg">LARGE</Button>
                  <Button disabled>DISABLED</Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                  Secondary (Outline)
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm">
                    SMALL
                  </Button>
                  <Button variant="secondary">LEARN MORE</Button>
                  <Button variant="secondary" size="lg">
                    LARGE
                  </Button>
                </div>
              </div>

              {/* Link Buttons */}
              <div>
                <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                  Link (Transparent)
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="link" href="#top">
                    LOG IN
                  </Button>
                  <Button variant="link" href="#docs">
                    DOCUMENTATION
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Cards Section */}
      <Section>
        <h2 className="font-aeonik-mono text-2xl uppercase mb-6 text-primary-dark">
          2. Card Component
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Card */}
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-dark">
                This is a default card with 2px solid border (#383838) and 4px
                border radius. No shadows, following border-first design
                philosophy.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">ACTION</Button>
              <Button variant="link" size="sm">
                CANCEL
              </Button>
            </CardFooter>
          </Card>

          {/* Elevated Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-dark">
                This card includes subtle shadow for elevation effect. Hover to
                see shadow increase.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="accent">FEATURED</Badge>
            </CardFooter>
          </Card>

          {/* Large Padding Card */}
          <Card padding="lg">
            <CardTitle className="mb-4">Large Padding</CardTitle>
            <CardContent>
              <p className="text-primary-dark">
                Cards support different padding sizes (sm, default, lg, none).
              </p>
            </CardContent>
          </Card>

          {/* No Padding Card (for images) */}
          <Card padding="none">
            <div className="h-32 bg-gradient-to-br from-accent-teal to-cube-teal-mid" />
            <div className="p-6">
              <CardTitle className="mb-2">Image Card</CardTitle>
              <p className="text-primary-dark text-sm">
                Use padding="none" for image cards with custom inner padding.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Inputs Section */}
      <Section>
        <h2 className="font-aeonik-mono text-2xl uppercase mb-6 text-primary-dark">
          3. Input Component
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Form Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Input */}
              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                fullWidth
              />

              {/* Input with Helper Text */}
              <Input
                label="Password"
                type="password"
                helperText="Must be at least 8 characters"
                fullWidth
              />

              {/* Input with Error */}
              <Input
                label="Username"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setHasError(false);
                }}
                error={hasError ? 'Username is required' : undefined}
                placeholder="Enter username"
                fullWidth
              />

              {/* Textarea */}
              <Textarea
                label="Message"
                placeholder="Enter your message here..."
                helperText="Maximum 500 characters"
                rows={4}
                fullWidth
              />

              <div className="flex gap-4">
                <Button type="submit">SUBMIT</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setInputValue('');
                    setHasError(false);
                  }}
                >
                  RESET
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>

      {/* Badges Section */}
      <Section>
        <h2 className="font-aeonik-mono text-2xl uppercase mb-6 text-primary-dark">
          4. Badge Component
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Badge Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default Badges */}
            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                Default Variants
              </h3>
              <BadgeGroup>
                <Badge>DEFAULT</Badge>
                <Badge variant="secondary">SECONDARY</Badge>
                <Badge variant="outline">OUTLINE</Badge>
                <Badge variant="accent">ACCENT</Badge>
              </BadgeGroup>
            </div>

            {/* Status Badges */}
            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                Status Badges
              </h3>
              <BadgeGroup>
                <Badge variant="warning">BETA</Badge>
                <Badge variant="success">ACTIVE</Badge>
                <Badge variant="error">ERROR</Badge>
              </BadgeGroup>
            </div>

            {/* Size Variants */}
            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                Size Variants
              </h3>
              <div className="flex items-center gap-4">
                <Badge size="sm">SMALL</Badge>
                <Badge size="default">DEFAULT</Badge>
                <Badge size="lg">LARGE</Badge>
              </div>
            </div>

            {/* Interactive Badges */}
            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-3 text-primary-dark">
                Interactive (Clickable)
              </h3>
              <BadgeGroup>
                <Badge variant="outline" interactive onClick={() => alert('Badge clicked!')}>
                  CLICK ME
                </Badge>
                <Badge variant="accent" interactive>
                  TAG 1
                </Badge>
                <Badge variant="accent" interactive>
                  TAG 2
                </Badge>
              </BadgeGroup>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Container Section */}
      <Section>
        <h2 className="font-aeonik-mono text-2xl uppercase mb-6 text-primary-dark">
          5. Container Component
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Responsive Containers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-primary-dark">
              Container components provide responsive max-width constraints and
              consistent padding across breakpoints.
            </p>

            <div className="space-y-2 font-inter text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="font-aeonik-mono uppercase">Size</span>
                <span className="font-aeonik-mono uppercase">Max Width</span>
              </div>
              <div className="flex justify-between">
                <code>sm</code>
                <span>640px</span>
              </div>
              <div className="flex justify-between">
                <code>md</code>
                <span>768px</span>
              </div>
              <div className="flex justify-between">
                <code>lg</code>
                <span>1024px</span>
              </div>
              <div className="flex justify-between">
                <code>xl</code>
                <span>1280px</span>
              </div>
              <div className="flex justify-between">
                <code>2xl</code>
                <span>1536px</span>
              </div>
              <div className="flex justify-between">
                <code>hero</code>
                <span>1400px (MotherDuck Hero)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Container Examples */}
        <div className="mt-6 space-y-4">
          <Container size="sm" padding="default">
            <div className="bg-accent-teal/20 border-2 border-accent-teal p-4 text-center">
              <code className="font-aeonik-mono text-sm">
                Container size="sm" (640px)
              </code>
            </div>
          </Container>

          <Container size="md" padding="default">
            <div className="bg-button-blue/20 border-2 border-button-blue p-4 text-center">
              <code className="font-aeonik-mono text-sm">
                Container size="md" (768px)
              </code>
            </div>
          </Container>

          <Container size="lg" padding="default">
            <div className="bg-banner-yellow/20 border-2 border-primary-dark p-4 text-center">
              <code className="font-aeonik-mono text-sm">
                Container size="lg" (1024px)
              </code>
            </div>
          </Container>
        </div>
      </Section>

      {/* Design System Reference */}
      <Section>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Design System Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-2 text-primary-dark">
                Color Palette
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="h-16 bg-primary-dark border-2 border-primary-dark rounded-[2px]" />
                  <p className="mt-2 text-xs font-aeonik-mono">
                    PRIMARY DARK<br />
                    <code className="text-[10px]">#383838</code>
                  </p>
                </div>
                <div>
                  <div className="h-16 bg-accent-teal border-2 border-primary-dark rounded-[2px]" />
                  <p className="mt-2 text-xs font-aeonik-mono">
                    ACCENT TEAL<br />
                    <code className="text-[10px]">#16AA98</code>
                  </p>
                </div>
                <div>
                  <div className="h-16 bg-button-blue border-2 border-primary-dark rounded-[2px]" />
                  <p className="mt-2 text-xs font-aeonik-mono">
                    BUTTON BLUE<br />
                    <code className="text-[10px]">#6fc2ff</code>
                  </p>
                </div>
                <div>
                  <div className="h-16 bg-neutral-beige border-2 border-primary-dark rounded-[2px]" />
                  <p className="mt-2 text-xs font-aeonik-mono">
                    NEUTRAL BEIGE<br />
                    <code className="text-[10px]">#F4EFEA</code>
                  </p>
                </div>
                <div>
                  <div className="h-16 bg-banner-yellow border-2 border-primary-dark rounded-[2px]" />
                  <p className="mt-2 text-xs font-aeonik-mono">
                    BANNER YELLOW<br />
                    <code className="text-[10px]">#FFD700</code>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-2 text-primary-dark">
                Typography
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-aeonik-mono">
                  <strong>Aeonik Mono</strong> (Space Mono fallback) - Headings, Buttons, Navigation
                </p>
                <p className="font-inter">
                  <strong>Inter</strong> - Body text, Paragraphs
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-aeonik-mono text-sm uppercase mb-2 text-primary-dark">
                Key Principles
              </h3>
              <ul className="space-y-1 text-sm font-inter list-disc list-inside">
                <li>Border-first design: 2px solid borders</li>
                <li>Minimal border radius: 2px (buttons), 4px (cards)</li>
                <li>Uppercase for UI elements (buttons, labels)</li>
                <li>Letter spacing: 0.5px for buttons/navigation</li>
                <li>High contrast for accessibility (AAA compliant)</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <BadgeGroup>
              <Badge variant="accent">ACCESSIBLE</Badge>
              <Badge variant="accent">RESPONSIVE</Badge>
              <Badge variant="accent">TYPESCRIPT</Badge>
              <Badge variant="accent">TAILWIND</Badge>
            </BadgeGroup>
          </CardFooter>
        </Card>
      </Section>

      {/* Footer */}
      <Container as="footer" vertical="lg">
        <div className="text-center space-y-4">
          <p className="font-aeonik-mono text-sm uppercase text-primary-dark">
            UI Component Library • MotherDuck Design System
          </p>
          <BadgeGroup className="justify-center">
            <Badge variant="outline" size="sm">React</Badge>
            <Badge variant="outline" size="sm">TypeScript</Badge>
            <Badge variant="outline" size="sm">Tailwind CSS</Badge>
          </BadgeGroup>
        </div>
      </Container>
    </div>
  );
};

export default UIShowcase;

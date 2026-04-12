import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: 'Daan dacht niet alleen aan een mooie site, maar meteen ook aan snelheid, structuur en hoe klanten sneller contact opnemen.',
      name: 'Bauke de Vries',
      designation: 'Eigenaar installatiebedrijf',
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
    {
      quote: 'De samenwerking voelde direct. Geen bureau-gedoe, gewoon snel schakelen en duidelijke keuzes maken.',
      name: 'Sanne Hoekstra',
      designation: 'MKB ondernemer',
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
    {
      quote: 'Voor ons was vooral de combinatie van design, techniek en meedenken in processen heel waardevol.',
      name: 'Jelte Bosma',
      designation: 'Projectleider',
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
      rating: 5,
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} autoplay />
}

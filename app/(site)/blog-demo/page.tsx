'use client'

import { BlogPostCard } from '@/components/ui/card-18'
import { motion } from 'framer-motion'
import WavePageHeader from '@/components/site/WavePageHeader'

// Mock data for blog posts
const posts = [
  {
    tag: 'Trends',
    date: '14 APRIL 2026',
    title: 'De Kunst van Digitale Transformatie: Van Visie naar Waarde',
    description: 'Ontdek praktijkvoorbeelden van bedrijven die hun digitale aanwezigheid opnieuw hebben uitgevonden.',
    href: '#',
  },
  {
    tag: 'Samenwerking',
    date: '10 APRIL 2026',
    title: 'Samenwerking die Converteert: Waarom de Juiste Partner Telt',
    description: 'Leer waarom het vinden van de juiste creatieve partner bepalend is voor online succes.',
    href: '#',
  },
  {
    tag: 'Design',
    date: '5 APRIL 2026',
    title: 'Gebruiker Centraal: Ontwerpen voor Impact in 2026',
    description: 'De nieuwste trends in UX, SEO en responsive design die vooruitstrevende merken helpen groeien.',
    href: '#',
  },
]

const featuredPost = {
  tag: 'Strategie',
  date: '20 APRIL 2026',
  title: 'Van Concept naar Kliks: Hoe Strategie Webdesign Voedt',
  description: 'Ontdek hoe een scherp gedefinieerde digitale strategie creatieve ideeën transformeert in hoogwaardige websites die gebruikers boeien.',
  href: '#',
  imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
}

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

// Animation variants for child items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function BlogPostCardDemo() {
  return (
    <div className="bg-white pb-20">
      <WavePageHeader
        badge="Nieuwe Component"
        title="Blog Post"
        titleHighlight="Card 18"
        subtitle="Een moderne blogkaart met framer-motion animaties en shadcn/ui integratie."
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mt-16">
        {/* Featured Post */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-12">
          <BlogPostCard
            variant="featured"
            {...featuredPost}
          />
        </motion.div>

        {/* Grid of Default Posts */}
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPostCard {...post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

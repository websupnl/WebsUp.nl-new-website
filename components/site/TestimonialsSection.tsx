import Image from 'next/image'
import { Testimonial } from '@/types/database.types'
import { Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({
  testimonials,
  title = 'Wat klanten over ons zeggen',
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 80}>
              <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                <StarRating rating={testimonial.rating} />

                <blockquote className="mt-4 text-gray-600 text-sm leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-100">
                  {testimonial.avatar_url ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

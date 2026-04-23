'use client'

import { motion } from 'motion/react'

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal'

export default function AnimatedModalDemo() {
  const images = [
    '/Daan Koolhaas.jpg',
    '/hero-bg.png',
    '/Projecten/verkeerschoolhaak_mockup.png',
    '/Projecten/rottevalle_mockup.png',
    '/Projecten/context-care-isa_mockup.png',
  ]

  return (
    <div className="flex items-center justify-center py-40">
      <Modal>
        <ModalTrigger className="group/modal-btn flex justify-center bg-black text-white dark:bg-white dark:text-black">
          <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-40">
            Gratis ontwerp
          </span>
          <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0">
            &rarr;
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
              Vraag een eerste richting aan voor je{' '}
              <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                website
              </span>
            </h4>
            <div className="flex items-center justify-center">
              {images.map((image, idx) => (
                <motion.div
                  key={`${image}-${idx}`}
                  style={{
                    rotate: idx * 5 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="-mr-4 mt-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <img
                    src={image}
                    alt=""
                    width="500"
                    height="500"
                    className="h-20 w-20 shrink-0 rounded-lg object-cover md:h-40 md:w-40"
                  />
                </motion.div>
              ))}
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white">
              Sluiten
            </button>
            <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Aanvragen
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  )
}

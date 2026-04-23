'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  Suspense,
} from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react'

export type ToastType = 'success' | 'error'

type Toast = {
  id: string
  message: string
  type: ToastType
}

type AppFeedbackContextValue = {
  toasts: Toast[]
  isNavigating: boolean
  show: (message: string, type?: ToastType) => void
  dismiss: (id: string) => void
  startNavigation: (target?: string) => void
  stopNavigation: () => void
}

const AppFeedbackContext = createContext<AppFeedbackContextValue | null>(null)

function ToastViewport({
  toasts,
  dismiss,
}: {
  toasts: Toast[]
  dismiss: (id: string) => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex max-w-sm flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm ${
            toast.type === 'success'
              ? 'border-emerald-100 bg-white/95 text-gray-900'
              : 'border-red-100 bg-white/95 text-gray-900'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          )}
          <span className="flex-1 leading-6">{toast.message}</span>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="text-gray-400 transition-colors hover:text-gray-700"
            aria-label="Melding sluiten"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

function TopProgressBar({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[110] transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="h-1 w-full overflow-hidden bg-blue-100/60">
        <div className="route-progress h-full w-1/3 rounded-r-full bg-blue-600" />
      </div>
      {visible && (
        <div className="absolute right-4 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm ring-1 ring-blue-100">
          <Loader2 size={13} className="animate-spin" />
          Laden...
        </div>
      )}
    </div>
  )
}

export function AppFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null)

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const startNavigation = useCallback((target?: string) => {
    setNavigationTarget(target ?? '__manual__')
  }, [])

  const stopNavigation = useCallback(() => {
    setNavigationTarget(null)
  }, [])

  const value = useMemo(
    () => ({
      toasts,
      isNavigating: Boolean(navigationTarget),
      show,
      dismiss,
      startNavigation,
      stopNavigation,
    }),
    [dismiss, navigationTarget, show, startNavigation, stopNavigation, toasts]
  )

  return (
    <AppFeedbackContext.Provider value={value}>
      <Suspense fallback={null}>
        <NavigationProgressSync
          navigationTarget={navigationTarget}
          stopNavigation={stopNavigation}
        />
      </Suspense>
      <TopProgressBar visible={Boolean(navigationTarget)} />
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </AppFeedbackContext.Provider>
  )
}

function NavigationProgressSync({
  navigationTarget,
  stopNavigation,
}: {
  navigationTarget: string | null
  stopNavigation: () => void
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentRoute = useMemo(() => {
    const query = searchParams.toString()
    return query ? `${pathname}?${query}` : pathname
  }, [pathname, searchParams])

  useEffect(() => {
    if (navigationTarget && (navigationTarget === '__manual__' || navigationTarget === currentRoute)) {
      stopNavigation()
    }
  }, [currentRoute, navigationTarget, stopNavigation])

  return null
}

export function useAppFeedback() {
  const context = useContext(AppFeedbackContext)

  if (!context) {
    throw new Error('useAppFeedback must be used within AppFeedbackProvider')
  }

  return context
}
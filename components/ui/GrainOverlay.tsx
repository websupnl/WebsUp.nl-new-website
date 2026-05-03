interface GrainOverlayProps {
  opacity?: number
  className?: string
}

export default function GrainOverlay({ opacity = 0.045, className = '' }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C%2Fsvg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        opacity,
      }}
    />
  )
}

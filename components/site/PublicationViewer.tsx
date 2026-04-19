'use client'

interface Props {
  flip_url: string
}

export default function PublicationViewer({ flip_url }: Props) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#06040c] shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
        <span>Publicatie viewer</span>
        <span>WebsUp</span>
      </div>
      <iframe
        src={flip_url}
        style={{ width: '100%', height: '720px', border: 0 }}
        allowFullScreen
        title="Publicatie viewer"
      />
    </div>
  )
}

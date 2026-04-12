'use client'

interface Props {
  flip_url: string
}

export default function PublicationViewer({ flip_url }: Props) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
      <iframe
        src={flip_url}
        style={{ width: '100%', height: '700px', border: 0 }}
        allowFullScreen
        title="Publicatie viewer"
      />
    </div>
  )
}

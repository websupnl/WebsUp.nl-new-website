'use client'

import { useRef, useState } from 'react'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import { uploadMedia } from '@/lib/actions/settings.actions'

interface MediaUploaderProps {
  value: string        // current URL
  onChange: (url: string) => void
  label?: string
  accept?: string      // e.g. "image/*" or "image/png,image/ico"
  maxSizeMB?: number
  className?: string
}

export default function MediaUploader({
  value,
  onChange,
  label,
  accept = 'image/*',
  maxSizeMB = 5,
  className = '',
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setError('')
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Bestand te groot (max ${maxSizeMB}MB)`)
      return
    }

    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1]
      const result = await uploadMedia(base64, file.name, file.type)
      setUploading(false)
      if ('error' in result) {
        setError(result.error)
      } else {
        onChange(result.url)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      )}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer group
          ${uploading ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50/30'}
          ${value ? 'p-2' : 'p-5'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-3 text-orange-500">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-xs font-medium">Uploaden...</span>
          </div>
        ) : value ? (
          <div className="relative">
            {/* Preview */}
            <img
              src={value}
              alt="Preview"
              className="h-16 max-w-full object-contain rounded-lg mx-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
            {/* Clear button */}
            <button
              type="button"
              onClick={clear}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
            >
              <X size={10} />
            </button>
            {/* Replace label */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold bg-white/90 text-gray-700 px-2 py-0.5 rounded-full shadow">
                Vervangen
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors">
              <ImageIcon size={20} />
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-gray-600 group-hover:text-orange-600 transition-colors">
                Klik of sleep afbeelding hierheen
              </span>
              <p className="text-xs text-gray-400 mt-0.5">
                PNG, JPG, SVG, ICO · max {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="mt-2 flex gap-2">
        <div className="flex-1 relative">
          <Upload size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Of plak een URL..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}

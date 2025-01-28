import type React from "react"
import { useRef, useState } from "react"
import { FileUser, Pencil } from "lucide-react"
import Image from "next/image"

interface AvatarUploadProps {
  onChange: (file: File) => void
  error?: string
}

export function AvatarUpload({ onChange, error }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      {preview ? (
        <Image
          src={preview}
          alt="Avatar"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
          <FileUser size={100} strokeWidth={1} className="text-gray-500" />
        </div>
      )}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full"
      >
        <Pencil size={16} />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}


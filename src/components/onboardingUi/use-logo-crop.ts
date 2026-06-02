import * as React from "react"
import { toast } from "sonner"
import type { Area } from "react-easy-crop"
import { getCroppedImg } from "./crop-image"

interface LogoCropState {
  logoPreview: string
  logoFile:    File | null
  cropOpen:    boolean
  rawSrc:      string
  crop:        { x: number; y: number }
  zoom:        number
  rotation:    number
}

interface LogoCropActions {
  setCrop:        (v: { x: number; y: number }) => void
  setZoom:        (v: number) => void
  setRotation:    (v: number) => void
  setCropOpen:    (v: boolean) => void
  onCropComplete: (_: unknown, pixels: Area) => void
  handleLogoChange:  (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCropConfirm: () => Promise<void>
  removeLogo:        () => void
}

export function useLogoCrop(): LogoCropState & LogoCropActions {
  const [logoPreview, setLogoPreview] = React.useState("")
  const [logoFile,    setLogoFile]    = React.useState<File | null>(null)
  const [cropOpen,    setCropOpen]    = React.useState(false)
  const [rawSrc,      setRawSrc]      = React.useState("")
  const [crop,        setCrop]        = React.useState({ x: 0, y: 0 })
  const [zoom,        setZoom]        = React.useState(1)
  const [rotation,    setRotation]    = React.useState(0)
  const croppedPixelsRef = React.useRef<Area | null>(null)

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem válida"); return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 5MB"); return
    }

    if (rawSrc) URL.revokeObjectURL(rawSrc)
    setRawSrc(URL.createObjectURL(file))
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setCropOpen(true)
    e.target.value = ""
  }

  async function handleCropConfirm() {
    if (!croppedPixelsRef.current) return
    const url = await getCroppedImg(rawSrc, croppedPixelsRef.current, rotation)
    if (!url) { toast.error("Erro ao cortar imagem"); return }

    const blob = await fetch(url).then((r) => r.blob())
    setLogoFile(new File([blob], "logo.png", { type: "image/png" }))

    if (logoPreview) URL.revokeObjectURL(logoPreview)
    setLogoPreview(url)
    setCropOpen(false)
  }

  function removeLogo() {
    if (logoPreview) URL.revokeObjectURL(logoPreview)
    if (rawSrc)      URL.revokeObjectURL(rawSrc)
    setLogoPreview("")
    setLogoFile(null)
    setRawSrc("")
  }

  function onCropComplete(_: unknown, pixels: Area) {
    croppedPixelsRef.current = pixels
  }

  return {
    logoPreview, logoFile, cropOpen, rawSrc, crop, zoom, rotation,
    setCrop, setZoom, setRotation, setCropOpen, onCropComplete,
    handleLogoChange, handleCropConfirm, removeLogo,
  }
}

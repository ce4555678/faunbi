"use client"

import * as React from "react"
import { ImagePlus, X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import Cropper from "react-easy-crop"

import { Button }   from "@/components/ui/button"
import { Input }    from "@/components/ui/input"
import { Slider }   from "@/components/ui/slider"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { useLogoCrop } from "./use-logo-crop"


interface LogoSectionProps {
  /** Expõe o File final ao formulário pai */
  onFileChange: (file: File | null) => void
}

export function LogoSection({ onFileChange }: LogoSectionProps) {
  const logo = useLogoCrop()

  // Sincroniza o File com o pai sempre que mudar
  React.useEffect(() => {
    onFileChange(logo.logoFile)
  }, [logo.logoFile, onFileChange])

  return (
    <>
      {/* ── Modal de Crop ──────────────────────────────────────────────── */}
      <Dialog open={logo.cropOpen} onOpenChange={logo.setCropOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajustar logo</DialogTitle>
          </DialogHeader>

          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-black">
            {logo.rawSrc && (
              <Cropper
                image={logo.rawSrc}
                crop={logo.crop}
                zoom={logo.zoom}
                rotation={logo.rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={logo.setCrop}
                onZoomChange={logo.setZoom}
                onRotationChange={logo.setRotation}
                onCropComplete={logo.onCropComplete}
              />
            )}
          </div>

          <div className="space-y-4 px-1">
            <div className="flex items-center gap-3">
              <ZoomOut className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Slider
                min={1} max={3} step={0.05}
                value={[logo.zoom]}
                onValueChange={(v) => logo.setZoom(v as number)}
                className="flex-1"
              />
              <ZoomIn className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-3">
              <RotateCw className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Slider
                min={0} max={360} step={1}
                value={[logo.rotation]}
                onValueChange={(v) => logo.setRotation(v as number)}
                className="flex-1"
              />
              <span className="w-10 text-right text-sm text-muted-foreground">
                {logo.rotation}°
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => logo.setCropOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={logo.handleCropConfirm}>Confirmar corte</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Seção visível no formulário ───────────────────────────────── */}
      <section className="rounded-2xl border border-border/50 bg-muted/20 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Logo da empresa</h3>
          <p className="text-sm text-muted-foreground">
            Faça upload e ajuste o recorte da logo do seu negócio.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Preview circular */}
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
              {logo.logoPreview ? (
                <img src={logo.logoPreview} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-10 w-10 text-muted-foreground" />
              )}
            </div>

            {logo.logoPreview && (
              <button
                type="button"
                onClick={logo.removeLogo}
                className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Upload + ações */}
          <div className="flex-1 space-y-2">
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={logo.handleLogoChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WEBP ou SVG · máx. 5 MB · recorte circular
            </p>
            {logo.logoPreview && (
              <button
                type="button"
                onClick={() => logo.setCropOpen(true)}
                className="text-xs text-primary dark:text-blue-400 underline underline-offset-2"
              >
                Reajustar corte
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

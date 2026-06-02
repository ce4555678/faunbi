"use client"

import { Controller, useFormContext } from "react-hook-form"
import { useMask } from "@react-input/mask"

import { Input }                    from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { CompanyFormData } from "./schema"

export function CompanyDataSection() {
  const { control } = useFormContext<CompanyFormData>()

  const phoneRef = useMask({ mask: "(__) _____-____",      replacement: { _: /\d/ } })
  const cnpjRef  = useMask({ mask: "__.___.___/____-__",   replacement: { _: /\d/ } })

  return (
    <section className="rounded-2xl border border-border/50 bg-muted/20 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Dados da empresa</h3>
        <p className="text-sm text-muted-foreground">Informações principais do negócio.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Controller name="businessName" control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Razão Social *</FieldLabel>
              <Input {...field} className="h-11" placeholder="Empresa LTDA" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller name="tradeName" control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nome Fantasia</FieldLabel>
              <Input {...field} className="h-11" placeholder="Minha Empresa" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller name="document" control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>CNPJ</FieldLabel>
              <Input {...field} ref={cnpjRef} className="h-11" placeholder="00.000.000/0000-00" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller name="phone" control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Telefone</FieldLabel>
              <Input {...field} ref={phoneRef} className="h-11" placeholder="(11) 99999-9999" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller name="email" control={control}
          render={({ field, fieldState }) => (
            <Field className="md:col-span-2" data-invalid={fieldState.invalid}>
              <FieldLabel>E-mail</FieldLabel>
              <Input {...field} type="email" className="h-11" placeholder="contato@empresa.com" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </section>
  )
}

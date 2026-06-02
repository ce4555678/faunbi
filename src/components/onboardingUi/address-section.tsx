"use client"

import { Controller, useFormContext } from "react-hook-form"
import { useMask } from "@react-input/mask"

import { Input }                    from "@/components/ui/input"
import { Field, FieldLabel }        from "@/components/ui/field"
import { CompanyFormData } from "./schema"

export function AddressSection() {
  const { control } = useFormContext<CompanyFormData>()

  const cepRef = useMask({ mask: "_____-___", replacement: { _: /\d/ } })

  return (
    <section className="rounded-2xl border border-border/50 bg-muted/20 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Endereço</h3>
        <p className="text-sm text-muted-foreground">Dados fiscais e localização.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-12">
        <Controller name="zipCode" control={control}
          render={({ field }) => (
            <Field className="md:col-span-3">
              <FieldLabel>CEP</FieldLabel>
              <Input {...field} ref={cepRef} className="h-11" placeholder="00000-000" />
            </Field>
          )}
        />

        <Controller name="street" control={control}
          render={({ field }) => (
            <Field className="md:col-span-7">
              <FieldLabel>Rua</FieldLabel>
              <Input {...field} className="h-11" placeholder="Rua Exemplo" />
            </Field>
          )}
        />

        <Controller name="number" control={control}
          render={({ field }) => (
            <Field className="md:col-span-2">
              <FieldLabel>Número</FieldLabel>
              <Input {...field} className="h-11" placeholder="123" />
            </Field>
          )}
        />

        <Controller name="district" control={control}
          render={({ field }) => (
            <Field className="md:col-span-4">
              <FieldLabel>Bairro</FieldLabel>
              <Input {...field} className="h-11" placeholder="Centro" />
            </Field>
          )}
        />

        <Controller name="city" control={control}
          render={({ field }) => (
            <Field className="md:col-span-5">
              <FieldLabel>Cidade</FieldLabel>
              <Input {...field} className="h-11" placeholder="Itapeva" />
            </Field>
          )}
        />

        <Controller name="state" control={control}
          render={({ field }) => (
            <Field className="md:col-span-3">
              <FieldLabel>UF</FieldLabel>
              <Input
                {...field}
                maxLength={2}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                placeholder="SP"
              />
            </Field>
          )}
        />

        <Controller name="complement" control={control}
          render={({ field }) => (
            <Field className="md:col-span-12">
              <FieldLabel>Complemento</FieldLabel>
              <Input {...field} className="h-11" placeholder="Sala, bloco, apartamento..." />
            </Field>
          )}
        />
      </div>
    </section>
  )
}

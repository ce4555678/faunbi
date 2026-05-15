"use client"
import dynamic from "next/dynamic"

const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  ssr: false,
})

export default function ButtonTheme() {
  return (
    <>
      <ThemeToggle />
    </>
  )
}
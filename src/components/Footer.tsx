'use client'

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground py-6 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4">
        © {new Date().getFullYear()} NavDigitalStudio. All rights reserved.
      </div>
    </footer>
  )
}

export function Footer() {
  return (
    <footer className="py-14 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between gap-6">
        <span className="text-sm text-neutral-400">© {new Date().getFullYear()} Nav Digital Studio</span>
        <a href="mailto:hello@navdigital.studio" className="text-sm underline decoration-dotted">hello@navdigital.studio</a>
      </div>
    </footer>
  )
}

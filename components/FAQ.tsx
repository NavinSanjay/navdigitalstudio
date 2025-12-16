import faq from '@/content/faq.json'
export function FAQ() {
  return (
    <section className="py-20 border-t border-white/10 bg-white/[0.01]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ & policies</h2>
        <div className="mt-6 space-y-4">
          {faq.map((f, i) => (
            <details key={i} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-neutral-300">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

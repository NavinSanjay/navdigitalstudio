export function Services() {
  return (
    <section className="py-20 border-t border-white/10 bg-white/[0.01]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Services & process</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { t: 'Strategy & UX', d: 'Discovery, IA, flows, content system.' },
            { t: 'Design & Build', d: 'High-taste UI, motion, responsive web.' },
            { t: 'Systems & Data', d: 'Integrations, automation, analytics.' }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] xray-outline">
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-2 text-neutral-300 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

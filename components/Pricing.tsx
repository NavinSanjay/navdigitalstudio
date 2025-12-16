export function Pricing() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Pricing / engagement</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { t: 'Starter', r: 'NZD 3k–6k', p: ['One-page or landing', '2–3 weeks', 'Light motion'] },
            { t: 'Growth', r: 'NZD 7k–15k', p: ['Multi-section site', 'Custom components', 'Integrations'] },
            { t: 'Bespoke', r: 'NZD 16k+', p: ['Systems thinking', 'Advanced data/AI', 'Longer runway'] }
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] xray-outline">
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-2 text-neutral-300">{s.r}</p>
              <ul className="mt-3 text-sm text-neutral-300 list-disc list-inside space-y-1">
                {s.p.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

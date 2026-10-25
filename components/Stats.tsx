const stats = [
  { value: '€500–2,000', label: 'Ticket size', highlight: false },
  { value: 'No equity', label: 'We don’t take a cut', highlight: true },
  { value: 'Hours, not months', label: 'From pitch to funded', highlight: false },
]

// Design-system StatTile: 1.5px ink outline, 8px corners, Space Grotesk 28px value, Inter 12px caption.
export default function Stats() {
  return (
    <section className="max-w-container mx-auto px-6 pt-8 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-md border border-ink px-[14px] py-3 ${s.highlight ? 'bg-brand' : 'bg-paper'}`}
        >
          <p className="font-display font-medium text-[28px] leading-[1.05]">{s.value}</p>
          <p className="mt-[6px] text-xs leading-[1.35]">{s.label}</p>
        </div>
      ))}
    </section>
  )
}

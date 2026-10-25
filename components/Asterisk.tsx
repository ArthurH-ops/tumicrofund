// The Spinoff Factory brand asterisk: four bars crossing at ±22.5° / ±67.5°. Inherits text colour.
export default function Asterisk({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 102 102"
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <g transform="translate(51 51)">
        {[22.5, -22.5, 67.5, -67.5].map((a) => (
          <rect key={a} x="-6.5" y="-52.5" width="13" height="105" transform={`rotate(${a})`} />
        ))}
      </g>
    </svg>
  )
}

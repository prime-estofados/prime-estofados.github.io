import { company } from '../data/company'

export default function TrustBar() {
  return (
    <div className="border-y border-teal/10 bg-white">
      <div className="container-prime flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-center">
        {company.trustBadges.map((badge) => (
          <span key={badge} className="flex items-center gap-2 text-sm font-medium text-navy/80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3aaa9e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

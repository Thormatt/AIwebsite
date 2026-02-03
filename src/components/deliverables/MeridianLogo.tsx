export function MeridianLogo({ className = "h-16" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none" className={className}>
      {/* M shape */}
      <path
        d="M20 45V15L30 30L40 15V45"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-text-primary"
      />
      {/* Circular accent */}
      <circle
        cx="30"
        cy="30"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        className="text-accent"
      />
      {/* Company name */}
      <text
        x="65"
        y="28"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill="currentColor"
        className="text-text-primary"
      >
        MERIDIAN
      </text>
      <text
        x="65"
        y="43"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="400"
        fill="currentColor"
        className="text-text-secondary"
      >
        FINANCIAL SERVICES
      </text>
    </svg>
  );
}

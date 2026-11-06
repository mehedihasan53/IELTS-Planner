import Icon from './Icon.jsx';

export function Field({ title, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium mb-1.5 mute">{title}</span>
      {children}
    </label>
  );
}

export function SegmentedControl({ options, value, onChange, format }) {
  return (
    <div className="seg" role="group">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={value === option ? 'on' : ''}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {format ? format(option) : option}
        </button>
      ))}
    </div>
  );
}

export function Ring({ value, size = 120, color = 'var(--acc)', track = 'var(--soft)', textColor = 'var(--ink)' }) {
  const radius = size / 2 - 9;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={size} height={size} role="img" aria-label={`${Math.round(value)}% complete`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth="9" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset .5s' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        style={{ fontSize: size / 4.2, fontWeight: 700 }}
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}

export function ProgressBar({ value, height = 8 }) {
  return (
    <div
      style={{ height, background: 'var(--soft)', borderRadius: 99 }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          background: 'var(--grad)',
          borderRadius: 99,
          transition: 'width .4s',
        }}
      />
    </div>
  );
}

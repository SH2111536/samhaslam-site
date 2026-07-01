function ImagePlaceholder({ label, height = 320 }) {
  return (
    <div
      style={{
        height,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-default)',
        background:
          'repeating-linear-gradient(135deg, var(--bg-surface), var(--bg-surface) 10px, var(--bg-surface-raised) 10px, var(--bg-surface-raised) 20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 12,
          letterSpacing: '.03em',
          color: 'var(--text-faint)',
          background: 'var(--bg-page)',
          padding: '4px 10px',
          borderRadius: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function About({ navigate }) {
  const { SectionHeading, Tag } = window.SamHaslam;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56, paddingTop: 40 }}>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SectionHeading eyebrow="About" title="Hi, I'm Sam." />
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              maxWidth: 'var(--measure-prose)',
            }}
          >
            I'm a risk, controls &amp; governance professional specialising in AI, technology and
            enterprise risk. I write about where governance frameworks are keeping pace with AI —
            and where they aren't — and speak on the same at conferences and industry panels.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              maxWidth: 'var(--measure-prose)',
            }}
          >
            Outside of that, this site is also where I put the odd personal project — mostly for
            an audience of friends and family, so don't expect it to stay entirely on-topic.
          </p>
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <Tag tone="accent">AI Risk</Tag>
            <Tag>Governance</Tag>
            <Tag>Enterprise Risk</Tag>
          </div>
        </div>
        <div style={{ flex: '1 1 240px', maxWidth: 280 }}>
          <ImagePlaceholder label="HEADSHOT — drop photo here" height={280} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeading size="sm" title="Speaking & talks" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['Panel: Governing Enterprise AI Risk', 'Industry roundtable · 2026'],
            ['Workshop: Building AI Risk Registers That Work', 'Internal conference · 2025'],
          ].map(([title, meta]) => (
            <div
              key={title}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: 14,
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ fontSize: 'var(--fs-body)', color: 'var(--text-primary)' }}>{title}</span>
              <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-faint)' }}>{meta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

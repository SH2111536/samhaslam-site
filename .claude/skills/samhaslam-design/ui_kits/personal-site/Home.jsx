function Home({ navigate }) {
  const { SectionHeading, Tag, PostCard, Button } = window.SamHaslam;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640, paddingTop: 40 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--ls-meta)',
            textTransform: 'uppercase',
            color: 'var(--accent-400)',
          }}
        >
          Risk · Governance · AI
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'var(--fs-display-2)',
            lineHeight: 'var(--lh-display-2)',
            color: 'var(--text-primary)',
          }}
        >
          Notes on risk, governance, and the machines making decisions for us.
        </h1>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-lg)',
            lineHeight: 'var(--lh-body-lg)',
            color: 'var(--text-secondary)',
          }}
        >
          I'm a risk, controls &amp; governance professional focused on AI and technology risk —
          writing, talks, and the occasional side project.
        </p>
        <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
          <Button variant="primary" onClick={() => navigate('writing')}>
            Read the writing
          </Button>
          <Button variant="secondary" onClick={() => navigate('contact')}>
            Get in touch
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <SectionHeading size="sm" title="Latest writing" />
          <a
            onClick={() => navigate('writing')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body-sm)',
              color: 'var(--link)',
              cursor: 'pointer',
            }}
          >
            All writing →
          </a>
        </div>
        <div>
          <PostCard
            tag="AI Governance"
            date="Jun 2026"
            title="Why governance frameworks lag behind model capability"
            excerpt="A look at the gap between how fast models ship and how slowly controls catch up."
            href="#"
          />
          <PostCard
            tag="Talks"
            date="May 2026"
            title="Notes from a panel on enterprise AI risk"
            href="#"
          />
        </div>
      </div>
    </div>
  );
}

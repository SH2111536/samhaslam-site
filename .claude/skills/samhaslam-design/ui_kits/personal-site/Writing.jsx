function Writing({ navigate }) {
  const { SectionHeading, PostCard } = window.SamHaslam;

  const posts = [
    {
      tag: 'AI Governance',
      date: 'Jun 2026',
      title: 'Why governance frameworks lag behind model capability',
      excerpt: 'A look at the gap between how fast models ship and how slowly controls catch up.',
    },
    {
      tag: 'Talks',
      date: 'May 2026',
      title: 'Notes from a panel on enterprise AI risk',
    },
    {
      tag: 'Enterprise Risk',
      date: 'Mar 2026',
      title: 'Three risk registers I keep coming back to',
      excerpt: 'None of them are perfect. Here is what I steal from each.',
    },
    {
      tag: 'Side Project',
      date: 'Jan 2026',
      title: 'Building this site',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 40 }}>
      <SectionHeading eyebrow="Writing" title="Essays, talk notes & side projects." />
      <div>
        {posts.map((p) => (
          <PostCard key={p.title} {...p} href="#" />
        ))}
      </div>
    </div>
  );
}

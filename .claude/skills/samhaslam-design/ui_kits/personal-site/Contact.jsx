function Contact({ navigate }) {
  const { SectionHeading, Input, TextArea, Button } = window.SamHaslam;
  const [sent, setSent] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 40, maxWidth: 520 }}>
      <SectionHeading eyebrow="Contact" title="Get in touch." />
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
        }}
      >
        Speaking enquiries, consulting questions, or just to say hello — the form below reaches me
        directly, or email{' '}
        <a href="mailto:hello@samhaslam.co.uk" style={{ color: 'var(--link)' }}>
          hello@samhaslam.co.uk
        </a>
        .
      </p>

      {sent ? (
        <div
          style={{
            padding: '16px 18px',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-sm)',
            color: 'var(--text-primary)',
          }}
        >
          Thanks — I'll get back to you shortly.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" placeholder="you@example.com" type="email" />
          </div>
          <TextArea label="Message" placeholder="What's on your mind?" rows={6} />
          <div>
            <Button variant="primary" as="button">
              Send message
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

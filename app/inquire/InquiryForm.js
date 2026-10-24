'use client';

import { useState } from 'react';

export default function InquiryForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.sample = form.elements.sample.checked;

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card" role="status">
        <div className="form-success">
          <h2>Thank you!</h2>
          <p>Your inquiry is on its way. I&apos;ll be in touch soon to talk about your story.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" aria-label="Inquiry form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="field">
          Name
          <input type="text" name="name" autoComplete="name" required maxLength={200} />
        </label>
        <label className="field">
          Email
          <input type="email" name="email" autoComplete="email" required maxLength={320} />
        </label>
      </div>

      <label className="field">
        Which service are you interested in?
        <select name="service" defaultValue="Developmental Editing">
          <option>Developmental Editing</option>
          <option>Line Editing</option>
          <option>Copy Editing</option>
          <option>Proofreading</option>
          <option>Beta Reading</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <div className="form-row">
        <label className="field">
          Genre
          <input type="text" name="genre" placeholder="e.g. romantasy" maxLength={200} />
        </label>
        <label className="field">
          Age category
          <select name="age" defaultValue="Adult">
            <option>Adult</option>
            <option>New Adult</option>
            <option>Young Adult</option>
            <option>Middle Grade</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          Approximate word count
          <input type="text" name="wordcount" inputMode="numeric" placeholder="e.g. 85,000" maxLength={50} />
        </label>
        <label className="field">
          Ideal start date
          <input type="date" name="start" />
        </label>
      </div>

      <label className="field">
        Preferred style guide
        <select name="styleguide" defaultValue="The Chicago Manual of Style (default)">
          <option>The Chicago Manual of Style (default)</option>
          <option>AP Stylebook</option>
          <option>MLA Handbook</option>
          <option>House style or other (mention below)</option>
          <option>No preference</option>
        </select>
      </label>

      <label className="field">
        Tell me about your book
        <textarea
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="A short blurb, where you are in the process, and anything you'd like me to know."
        />
      </label>

      <label className="check">
        <input type="checkbox" name="sample" />
        I&apos;d like a 1,000-word sample edit (line, copy or proofreading)
      </label>

      {/* Hidden from people; bots tend to fill it in */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p className="form-status form-status--error" role="alert">
          {error} You can also email me directly at tgallaway15@icloud.com.
        </p>
      )}

      <button type="submit" className="btn btn--dark" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const LIMITS = {
  name: 200,
  email: 320,
  service: 100,
  genre: 200,
  age: 50,
  wordcount: 50,
  start: 20,
  styleguide: 100,
  message: 5000,
};

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Spam trap: real visitors never see or fill this field.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = {};
  for (const [key, max] of Object.entries(LIMITS)) inquiry[key] = clean(body[key], max);
  inquiry.sample = body.sample === true;

  if (!inquiry.name || !inquiry.email) {
    return NextResponse.json({ error: 'Please add your name and email.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return NextResponse.json({ error: 'Please check your email address.' }, { status: 400 });
  }

  // Accept the URL with or without a trailing slash or "/rest/v1" pasted on the end.
  const supabaseUrl = (process.env.SUPABASE_URL || '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/rest\/v1$/, '');
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing.');
    return NextResponse.json({ error: 'The form isn’t connected yet.' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
  const { error: dbError } = await supabase.from('inquiries').insert({
    name: inquiry.name,
    email: inquiry.email,
    service: inquiry.service || null,
    genre: inquiry.genre || null,
    age_category: inquiry.age || null,
    word_count: inquiry.wordcount || null,
    start_date: inquiry.start || null,
    style_guide: inquiry.styleguide || null,
    message: inquiry.message || null,
    wants_sample: inquiry.sample,
  });

  if (dbError) {
    console.error('Supabase insert failed:', dbError);
    return NextResponse.json({ error: 'Your inquiry couldn’t be sent.' }, { status: 500 });
  }

  // Email notification. The inquiry is already saved, so a failed email doesn't fail the form.
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (resendKey && to) {
    const rows = [
      ['Name', inquiry.name],
      ['Email', inquiry.email],
      ['Service', inquiry.service],
      ['Genre', inquiry.genre],
      ['Age category', inquiry.age],
      ['Word count', inquiry.wordcount],
      ['Ideal start date', inquiry.start],
      ['Style guide', inquiry.styleguide],
      ['Sample edit requested', inquiry.sample ? 'Yes' : 'No'],
    ];
    const text =
      rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n') +
      `\n\nAbout the book:\n${inquiry.message || '—'}`;
    const html = `
      <div style="font-family: Georgia, serif; color: #4A2A35; max-width: 560px">
        <h2 style="color: #66203B; font-weight: normal">New inquiry from ${escapeHtml(inquiry.name)}</h2>
        <table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding: 4px 16px 4px 0; color: #7A5562">${label}</td><td style="padding: 4px 0">${escapeHtml(value || '—')}</td></tr>`
            )
            .join('')}
        </table>
        <h3 style="color: #66203B; font-weight: normal; margin-top: 24px">About the book</h3>
        <p style="font-family: Arial, sans-serif; font-size: 14px; white-space: pre-wrap">${escapeHtml(inquiry.message || '—')}</p>
      </div>`;

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL || 'Calliope Editing <onboarding@resend.dev>',
          to: [to],
          reply_to: inquiry.email,
          subject: `New inquiry: ${inquiry.service || 'Editing'} · ${inquiry.name}`,
          text,
          html,
        }),
      });
      if (!res.ok) console.error('Resend email failed:', res.status, await res.text());
    } catch (err) {
      console.error('Resend email failed:', err);
    }
  }

  return NextResponse.json({ ok: true });
}

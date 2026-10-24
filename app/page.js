import Link from 'next/link';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Services & Pricing',
};

// Edit services and prices here. `rate` is the price per word in dollars.
const SERVICES = [
  {
    kicker: '01 · The big picture',
    name: 'Developmental Editing',
    rate: 0.035,
    description:
      "A deep look at the bones of your story: plot, pacing, structure, character arcs, worldbuilding, and stakes. You'll receive an editorial letter and in-manuscript notes on what's working and where the story can grow.",
    sample: false,
  },
  {
    kicker: '02 · Sentence by sentence',
    name: 'Line Editing',
    rate: 0.03,
    description:
      'Polishing the prose itself: voice, flow, rhythm, word choice, clarity, and tone, so every line reads the way you hear it in your head.',
    sample: true,
  },
  {
    kicker: '03 · Clean and consistent',
    name: 'Copy Editing',
    rate: 0.025,
    description:
      'Grammar, punctuation, spelling, syntax, and consistency, from character names and timelines to capitalization and style choices, all tracked in a style sheet for your book.',
    sample: true,
  },
  {
    kicker: '04 · The final polish',
    name: 'Proofreading',
    rate: 0.02,
    description:
      'The last pass before publishing: catching typos, missed words, formatting slips and any lingering errors so your book goes out into the world clean.',
    sample: true,
  },
  {
    kicker: "05 · A reader's eye",
    name: 'Beta Reading',
    rate: 0.005,
    description:
      "An honest reader's reaction to your story: what pulled me in, where my attention drifted, which characters I loved, and how the ending landed.",
    sample: false,
  },
];

const EXAMPLE_WORDS = 80000;

function formatRate(rate) {
  return `$${rate.toFixed(3)}`;
}

function formatExample(rate) {
  return `${EXAMPLE_WORDS.toLocaleString('en-US')} words ≈ $${Math.round(rate * EXAMPLE_WORDS).toLocaleString('en-US')}`;
}

export default function ServicesPage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Services &amp; Pricing</p>
        <h1 className="display">
          Every story deserves <em>to sing.</em>
        </h1>
        <p className="hero__lede">
          From the big-picture shape of your manuscript down to the final comma, choose the stage of editing your book
          needs. All pricing is per word.
        </p>
        <div className="double-rule" aria-hidden="true" />
      </section>

      <section className="services" aria-label="Services">
        {SERVICES.map((service) => (
          <article className="service" key={service.name}>
            <div className="service__body">
              <p className="service__kicker">{service.kicker}</p>
              <h2 className="service__name">{service.name}</h2>
              <p className="service__desc">{service.description}</p>
              {service.sample && <p className="pill">1,000-word sample edit available</p>}
            </div>
            <div className="service__price">
              <p className="price">{formatRate(service.rate)}</p>
              <p className="price__unit">per word</p>
              <p className="price__example">{formatExample(service.rate)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="band band--dark">
        <div className="band__inner">
          <h2 className="band__title">Not sure which edit you need?</h2>
          <p className="band__text">
            Tell me a little about your book and where it is in the process, and I&apos;ll help you find the right fit.
          </p>
          <Link href="/inquire" className="btn btn--light">
            Send an inquiry
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

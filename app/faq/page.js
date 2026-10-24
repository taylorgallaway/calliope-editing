import Link from 'next/link';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'FAQ',
};

export default function FaqPage() {
  return (
    <>
      <section className="hero faq-hero">
        <p className="eyebrow">FAQ</p>
        <h1 className="display">
          Questions, <em>answered.</em>
        </h1>
        <div className="double-rule" aria-hidden="true" />
      </section>

      <section className="faq-list" aria-label="Frequently asked questions">
        <details className="faq" open>
          <summary>
            What&apos;s your turnaround time?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>
            Most projects are returned within two to three weeks. Timing can vary with word count and the type of edit,
            and I&apos;ll confirm your exact dates before we begin.
          </p>
        </details>

        <details className="faq">
          <summary>
            What is your AI policy?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>
            Your words stay yours. No part of your manuscript will ever be fed into AI, for any reason. Every edit is
            done by me, by hand.
          </p>
        </details>

        <details className="faq">
          <summary>
            What file formats do you accept?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>I work in Google Docs and Microsoft Word.</p>
        </details>

        <details className="faq">
          <summary>
            Which style guide do you use?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>
            I usually work with <em>The Chicago Manual of Style</em>, but I&apos;m happy to follow a different style
            guide if you prefer. Just note it in your inquiry so we&apos;re on the same page from the start.
          </p>
        </details>

        <details className="faq">
          <summary>
            What genres do you specialize in?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>
            I specialize in fantasy, romantasy, dystopian and adventure, across age categories from adult down to
            middle grade. I&apos;ve also worked with a wide range of other genres and am happy to take on just about
            anything, so don&apos;t hesitate to reach out.
          </p>
        </details>

        <details className="faq">
          <summary>
            Do you offer sample edits?<span className="faq__plus" aria-hidden="true">+</span>
          </summary>
          <p>
            Yes! I offer 1,000-word sample edits for line editing, copy editing and proofreading, so you can see how I
            work before you commit. Just mention it on the <Link href="/inquire">inquiry form</Link>.
          </p>
        </details>
      </section>

      <section className="band band--blush">
        <div className="band__inner">
          <h2 className="band__title">Still have a question?</h2>
          <p className="band__text">I&apos;m happy to help. Reach out and I&apos;ll get back to you.</p>
          <Link href="/inquire" className="btn btn--dark">
            Get in touch
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

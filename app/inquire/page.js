import Footer from '../../components/Footer';
import InquiryForm from './InquiryForm';

export const metadata = {
  title: 'Inquire',
};

export default function InquirePage() {
  return (
    <>
      <section className="inquire">
        <div className="inquire__intro">
          <p className="eyebrow">Contact &amp; Inquire</p>
          <h1 className="display">
            Let&apos;s talk about <em>your story.</em>
          </h1>
          <p className="inquire__lede">
            Fill out the form with a few details about your manuscript, and I&apos;ll be in touch to talk timelines,
            fit, and next steps.
          </p>
          <div className="double-rule" aria-hidden="true" />
          <div className="facts">
            <div>
              <p className="fact__label">Turnaround</p>
              <p className="fact__value">typically two to three weeks</p>
            </div>
            <div>
              <p className="fact__label">Sample edits</p>
              <p className="fact__value">1,000 words for line, copy or proofreading</p>
            </div>
            <div>
              <p className="fact__label">Email</p>
              <p className="fact__value">
                <a href="mailto:tgallaway15@icloud.com">tgallaway15@icloud.com</a>
              </p>
            </div>
          </div>
        </div>

        <InquiryForm />
      </section>

      <Footer ruled />
    </>
  );
}

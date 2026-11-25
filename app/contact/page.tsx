import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Infos",
  description:
    "Send an inquiry to Lekha Rathnam for editorial commissions, commercial work, exhibitions or image licensing.",
};

export default function ContactPage() {
  return (
    <main className="contact">
      <div className="contact__main">
        <div className="contact__body">
          <ContactForm />
        </div>

        <dl className="contact__aside reveal" style={{ "--i": 5 } as React.CSSProperties}>
          <div>
            <dt className="label">Studio</dt>
            <dd>Bangalore, India</dd>
          </div>
          <div>
            <dt className="label">Correspondence</dt>
            <dd>
              <a href="mailto:hello@lekharathnam.com" className="link">
                hello@lekharathnam.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Instagram</dt>
            <dd>
              <a
                href="https://www.instagram.com/lekharathnam"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                @lekharathnam
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Replies</dt>
            <dd>Within 48 hours</dd>
          </div>
        </dl>
      </div>

      <Footer />
    </main>
  );
}

import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Lekha Rathnam for editorial commissions, commercial work, or print inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-linen">
      {/* Spacer for fixed nav */}
      <div style={{ height: "var(--nav-height)" }} />

      <div className="flex-grow py-16 lg:py-24 px-8 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-editorial mb-4">Contact</p>
              <h1 className="font-fraunces font-light text-display-sm text-charcoal mb-4">
                Let's talk about your project.
              </h1>
              <p className="font-inter font-light text-ash text-[0.95rem] leading-editorial max-w-prose">
                For editorial commissions, commercial inquiries, or to request a full portfolio, please use the form or get in touch directly.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <p className="text-caption mb-1">Email</p>
                <a
                  href="mailto:hello@lekharathnam.com"
                  className="font-inter font-light text-charcoal hover:text-terracotta transition-colors duration-250"
                >
                  hello@lekharathnam.com
                </a>
              </div>
              <div>
                <p className="text-caption mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/lekharathnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-light text-charcoal hover:text-terracotta transition-colors duration-250"
                >
                  @lekharathnam
                </a>
              </div>
              <div>
                <p className="text-caption mb-1">Locations</p>
                <p className="font-inter font-light text-charcoal">
                  New Delhi &amp; Pondicherry, India
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 lg:pl-12 border-t lg:border-t-0 lg:border-l border-beige-deep/40 pt-12 lg:pt-0">
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

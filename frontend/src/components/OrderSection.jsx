import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { author } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputClass =
  "w-full bg-transparent border border-white/15 focus:border-[#D4AF37] outline-none px-5 py-4 text-sm font-light text-[#F2EBE5] placeholder:text-[#A39E93]/50 transition-colors duration-300 text-left";

export default function OrderSection() {
  const [form, setForm] = useState({ name: "", email: "", quantity: 1, message: "" });
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/orders`, {
        ...form,
        quantity: Number(form.quantity),
        message: form.message || null,
      });
      setReceipt(data.id);
      setForm({ name: "", email: "", quantity: 1, message: "" });
      toast.success("Commande bien reçue — nous vous écrivons très vite.");
    } catch (err) {
      toast.error("La commande n'a pas abouti. Vérifiez les champs et réessayez.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="commande"
      data-testid="order-section"
      className="relative py-32 border-t border-white/10"
    >
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeading number="05" title="Recevoir l'Ouvrage" />
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Recevoir <span className="italic text-[#D4AF37]">l'ouvrage</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
            Laissez vos coordonnées : nous vous écrivons sous vingt-quatre
            heures pour finaliser la commande. Pas de paiement en ligne — un
            échange, comme autrefois.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 border border-white/10 bg-[#13151A] p-6 text-left" data-testid="order-summary">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <p className="font-display text-lg text-[#F2EBE5]">
                {author.book.title} — Ibn al-Qayyim
              </p>
              <p className="font-display text-lg text-[#D4AF37]">{author.book.price}</p>
            </div>
            <p className="mt-4 font-mono-archive text-[10px] tracking-[0.2em] uppercase text-[#A39E93]">
              {author.book.edition} · {author.book.langue} · {author.book.pages} pages
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          {receipt ? (
            <div
              className="mt-10 border border-[#D4AF37]/40 bg-[#13151A] p-10 sm:p-14"
              data-testid="order-success"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center border border-[#D4AF37] text-[#D4AF37]">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-8 font-display font-light text-3xl text-[#F2EBE5]">
                Votre commande est consignée.
              </h3>
              <p className="mt-4 text-base font-light leading-relaxed text-[#A39E93]">
                Reçu Nº{" "}
                <span className="font-mono-archive text-[#D4AF37]">
                  {receipt.slice(-6).toUpperCase()}
                </span>{" "}
                — nous vous écrivons très vite pour la suite. Qu'Allah facilite.
              </p>
              <button
                onClick={() => setReceipt(null)}
                data-testid="order-again-button"
                className="mt-10 font-mono-archive text-[11px] tracking-[0.25em] uppercase text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300"
              >
                ← Passer une autre commande
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-6 text-left" data-testid="order-form">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="order-name" className="block font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93] mb-3">
                    Nom complet
                  </label>
                  <input
                    id="order-name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Votre nom"
                    data-testid="order-name-input"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="order-email" className="block font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93] mb-3">
                    Adresse e-mail
                  </label>
                  <input
                    id="order-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="vous@exemple.com"
                    data-testid="order-email-input"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="order-quantity" className="block font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93] mb-3">
                  Quantité
                </label>
                <select
                  id="order-quantity"
                  value={form.quantity}
                  onChange={update("quantity")}
                  data-testid="order-quantity-select"
                  className={`${inputClass} bg-[#0B0C10]`}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} exemplaire{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="order-message" className="block font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93] mb-3">
                  Note — facultatif
                </label>
                <textarea
                  id="order-message"
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Une précision, une dédicace, une question…"
                  data-testid="order-message-input"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={sending}
                  data-testid="order-submit-button"
                  className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0B0C10] px-9 py-4 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:bg-[#F2EBE5] disabled:opacity-50 transition-colors duration-300"
                >
                  {sending ? "Consignation…" : "Consigner la commande"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

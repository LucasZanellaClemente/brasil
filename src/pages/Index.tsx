import { useState } from "react";
import ProductModal from "@/components/ProductModal";
import { createProductWhatsAppHref } from "@/lib/whatsapp";

// Fotos da camisa amarela (substituir aqui)
import camisaAmarela1 from "@/assets/camisa-amarela-1.jpeg";
import camisaAmarela2 from "@/assets/camisa-amarela-2.jpeg";
import camisaAmarela3 from "@/assets/camisa-amarela-3.jpeg";
import camisaAmarela4 from "@/assets/camisa-amarela-4.jpeg";

// Fotos da camisa azul (substituir aqui)
import camisaAzul1 from "@/assets/camisa-azul-1.jpeg";
import camisaAzul2 from "@/assets/camisa-azul-2.jpeg";
import camisaAzul3 from "@/assets/camisa-azul-3.jpeg";

const SIZES = ["P", "M", "L", "XL", "2XL", "3XL"] as const;
const COLORS = [
  { id: "amarelo", label: "Amarelo", hex: "#FFDF00" },
  { id: "azul", label: "Azul", hex: "#002776" },
] as const;

type ColorId = "amarelo" | "azul";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ── Product images map ── */
const PRODUCT_IMAGES: Record<string, { amarelo: string[]; azul: string[] }> = {
  card1: {
    amarelo: [camisaAmarela1, camisaAmarela2, camisaAmarela3, camisaAmarela4],
    azul: [camisaAzul1, camisaAzul2, camisaAzul3],
  },
  card2: {
    amarelo: [camisaAmarela1, camisaAmarela2, camisaAmarela3, camisaAmarela4],
    azul: [camisaAzul1, camisaAzul2, camisaAzul3],
  },
};

/* ── Product Card ── */
interface ProductCardProps {
  cardKey: string;
  name: string;
  badge: string;
  badgeColor: string;
  price: string;
  defaultColor: ColorId;
  ctaColor: string;
  animationClass: string;
}

function ProductCard({
  cardKey,
  name,
  badge,
  badgeColor,
  price,
  defaultColor,
  ctaColor,
  animationClass,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorId>(defaultColor);
  const [shaking, setShaking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const colorLabel = COLORS.find((c) => c.id === selectedColor)?.label ?? "";
  const images = PRODUCT_IMAGES[cardKey][selectedColor];
  const currentImage = images[0];

  const whatsappHref = selectedSize ? createProductWhatsAppHref(colorLabel, selectedSize) : "#";

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectedSize) return;

    e.preventDefault();
    setShaking(true);
    window.setTimeout(() => setShaking(false), 500);
  };

  return (
    <>
      <div className={`bg-card rounded-2xl overflow-hidden border border-border ${animationClass}`}>
        {/* Image — click to open modal */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer group"
          onClick={() => setModalOpen(true)}
        >
          <img
            id={`foto-camisa-${defaultColor === "amarelo" ? "amarela" : "azul"}`}
            src={currentImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold font-body"
            style={{ backgroundColor: badgeColor, color: badgeColor === "#FFDF00" ? "#0a0a1a" : "#fff" }}
          >
            {badge}
          </span>
          {/* "Ver detalhes" overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 bg-background/90 rounded-full font-body font-semibold text-foreground text-sm">
              🔍 Ver detalhes
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 md:p-6 space-y-4">
          <h3 className="font-display text-2xl md:text-3xl tracking-wide text-foreground">{name}</h3>
          <p className="font-display text-3xl md:text-4xl text-accent">{price}</p>

          {/* Size selector */}
          <div className={shaking ? "animate-shake" : ""}>
            <p className="text-sm font-body text-muted-foreground mb-2">
              Tamanho {!selectedSize && <span className="text-destructive">*</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold font-body border transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div>
            <p className="text-sm font-body text-muted-foreground mb-2">Cor</p>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color.id ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.label}
                />
              ))}
            </div>
          </div>

          {/* WhatsApp CTA — now an <a> tag */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            aria-disabled={!selectedSize}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-lg font-bold font-body transition-all duration-200 animate-whatsapp-pulse hover:brightness-110 ${ctaColor}`}
          >
            <WhatsAppIcon />
            💬 QUERO ESSA CAMISA
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name={name}
        badge={badge}
        badgeColor={badgeColor}
        colorLabel={colorLabel}
        images={images}
        ctaColor={ctaColor}
      />
    </>
  );
}

/* ── Page ── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-diamond-pattern">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground font-body font-bold text-sm animate-whatsapp-pulse">
            EDIÇÃO LIMITADA 🏆
          </span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground leading-none">
            VISTA A <span className="text-accent">SELEÇÃO</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Camisas do Brasil para a Copa do Mundo · Entrega rápida
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* CARD 1 — CAMISA AMARELA */}
          <ProductCard
            cardKey="card1"
            name="Camisa Brasil 2026 — Modelo Amarelo"
            badge="AMARELINHA ⭐"
            badgeColor="#FFDF00"
            price="R$ 149,90"
            defaultColor="amarelo"
            ctaColor="bg-brasil-green text-white"
            animationClass="animate-fade-slide-up"
          />
          {/* CARD 2 — CAMISA AZUL */}
          <ProductCard
            cardKey="card2"
            name="Camisa Brasil 2026 — Modelo Azul"
            badge="AZUL CELESTE 💙"
            badgeColor="#002776"
            price="R$ 149,90"
            defaultColor="azul"
            ctaColor="bg-brasil-blue text-white"
            animationClass="animate-fade-slide-up-delay"
          />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-border py-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-muted-foreground font-body text-sm md:text-base">
          <span>✅ Entrega rápida</span>
          <span>✅ Produto original</span>
          <span>✅ Atendimento via WhatsApp</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center font-body text-sm text-muted-foreground">
        © 2026 · Feito com 💚 para a torcida brasileira
      </footer>
    </div>
  );
};

export default Index;

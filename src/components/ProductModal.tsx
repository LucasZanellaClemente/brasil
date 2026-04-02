import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SIZES = ["P", "M", "L", "XL", "2XL", "3XL"] as const;
const WHATSAPP_NUMBER = "5511989422080";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  badge: string;
  badgeColor: string;
  colorLabel: string;
  images: string[];
  ctaColor: string;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductModal({
  open,
  onClose,
  name,
  badge,
  badgeColor,
  colorLabel,
  images,
  ctaColor,
}: ProductModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  const whatsappHref = selectedSize
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Olá! Tenho interesse na Camisa Brasil 2026 modelo ${colorLabel} tamanho ${selectedSize}. Pode me passar mais informações?`
      )}`
    : "#";

  const handleCtaClick = (e: React.MouseEvent) => {
    if (!selectedSize) {
      e.preventDefault();
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        {/* Hidden accessible title */}
        <DialogTitle className="sr-only">{name}</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1.5 rounded-full text-sm font-bold font-body"
              style={{ backgroundColor: badgeColor, color: badgeColor === "#FFDF00" ? "#0a0a1a" : "#fff" }}
            >
              {badge}
            </span>
            <h2 className="font-display text-xl md:text-2xl tracking-wide text-foreground">{name}</h2>
          </div>
        </div>

        {/* Main image + navigation */}
        <div className="relative aspect-[3/4] md:aspect-[4/3] bg-muted overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`${name} - foto ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          {/* Nav arrows */}
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 justify-center overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === currentIndex ? "border-accent scale-105" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Size selector + CTA */}
        <div className="p-4 md:p-6 space-y-4 border-t border-border">
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

          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-lg font-bold font-body transition-all duration-200 animate-whatsapp-pulse hover:brightness-110 ${ctaColor}`}
          >
            <WhatsAppIcon />
            💬 QUERO ESSA CAMISA
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import productRed from "@/assets/product-red.png";
import productBlack from "@/assets/product-black.png";

const STRIPE_LINK = "https://buy.stripe.com/14A3cw83q1ORb0QgL02go00";
const UNIT_PRICE = 39.99;

export type Variant = "red" | "black";

interface CartItem {
  color: Variant;
  quantity: number;
}

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  item: CartItem | null;
  setItem: (i: CartItem | null) => void;
}

export const CartCheckout = ({ open, onOpenChange, item, setItem }: Props) => {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    street: "", city: "", postal_code: "", country: "España",
  });

  const total = item ? +(UNIT_PRICE * item.quantity).toFixed(2) : 0;
  const colorLabel = item?.color === "red" ? "Rojo Rubí" : "Negro Oro";
  const img = item?.color === "red" ? productRed : productBlack;

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  // ⭐⭐ VERSIÓN APLICADA: REDIRECCIÓN DIRECTA A STRIPE ⭐⭐
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    for (const [k, v] of Object.entries(form)) {
      if (!v.trim()) { toast.error("Completa todos los campos"); return; }
      if (k === "email" && !/^\S+@\S+\.\S+$/.test(v)) { toast.error("Email no válido"); return; }
    }

    setLoading(true);
    toast.success("Redirigiendo al pago…");

    const stripeUrl = new URL(STRIPE_LINK);
    stripeUrl.searchParams.set("prefilled_email", form.email);
    stripeUrl.searchParams.set("color", colorLabel);

    setTimeout(() => {
      window.location.href = stripeUrl.toString();
    }, 800);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-gradient-rose">
            {step === "cart" ? "Tu carrito" : "Finalizar compra"}
          </SheetTitle>
        </SheetHeader>

        {!item ? (
          <div className="py-20 text-center text-charcoal/60">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>Tu carrito está vacío</p>
          </div>
        ) : step === "cart" ? (
          <div className="mt-6 space-y-6">
            <div className="flex gap-4 p-4 rounded-2xl border border-soft-pink/40 bg-gradient-soft">
              <img src={img} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-serif text-lg text-charcoal">Liftéa Pro</h3>
                <p className="text-sm text-charcoal/60">Color: {colorLabel}</p>
                <p className="text-sm text-deep-pink font-semibold mt-1">{UNIT_PRICE.toFixed(2)}€</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => setItem({ ...item, quantity: Math.max(1, item.quantity - 1) })}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => setItem({ ...item, quantity: item.quantity + 1 })}>
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto text-charcoal/50"
                    onClick={() => setItem(null)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <span className="text-charcoal/70">Total</span>
              <span className="font-serif text-3xl text-gradient-rose">{total.toFixed(2)}€</span>
            </div>

            <Button variant="luxury" size="xl" className="w-full" onClick={() => setStep("checkout")}>
              Continuar con la compra
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="p-3 rounded-xl bg-gradient-soft text-sm flex justify-between">
              <span>Liftéa Pro · {colorLabel} × {item.quantity}</span>
              <span className="font-semibold">{total.toFixed(2)}€</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Nombre completo *</Label>
              <Input id="full_name" required value={form.full_name} onChange={update("full_name")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={form.email} onChange={update("email")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" type="tel" required value={form.phone} onChange={update("phone")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Calle, número y piso *</Label>
              <Input id="street" required value={form.street} onChange={update("street")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input id="city" required value={form.city} onChange={update("city")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Código postal *</Label>
                <Input id="postal_code" required value={form.postal_code} onChange={update("postal_code")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País *</Label>
              <Input id="country" required value={form.country} onChange={update("country")} />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep("cart")} disabled={loading}>
                Atrás
              </Button>
              <Button type="submit" variant="luxury" size="xl" className="flex-1" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Procesando…</> : `Pagar ${total.toFixed(2)}€`}
              </Button>
            </div>
            <p className="text-xs text-center text-charcoal/50 pt-2">
              Serás redirigido a Stripe para completar el pago de forma segura.
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const CartTrigger = ({ count, onClick }: { count: number; onClick: () => void }) => (
  <Button variant="ghost" size="icon" onClick={onClick} className="relative">
    <ShoppingBag className="w-5 h-5" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-deep-pink text-white text-xs flex items-center justify-center font-semibold">
        {count}
      </span>
    )}
  </Button>
);

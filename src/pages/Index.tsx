import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Zap, Heart, Shield, Truck, Lock, Star, Check, ChevronRight, Leaf, Award, BadgeCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import productRed from "@/assets/product-red.png";
import productBlack from "@/assets/product-black.png";
import skinGlow from "@/assets/skin-glow.jpg";
import logo from "@/assets/logo-liftea.png";
import { CartCheckout, CartTrigger, type Variant } from "@/components/CartCheckout";

const Index = () => {
  const [variant, setVariant] = useState<Variant>("red");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState<{ color: Variant; quantity: number } | null>(null);

  const addToCart = () => {
    setCartItem({ color: variant, quantity: (cartItem?.color === variant ? cartItem.quantity : 0) + 1 });
    setCartOpen(true);
  };

  const benefits = [
    { icon: Sparkles, title: "Efecto lifting inmediato", desc: "Resultados visibles desde la primera sesión" },
    { icon: Heart, title: "Reduce arrugas", desc: "Suaviza líneas finas y de expresión" },
    { icon: Zap, title: "Mejora la firmeza", desc: "Tonifica y reafirma tu piel" },
    { icon: Star, title: "Luz roja y azul", desc: "Estimula colágeno y purifica" },
    { icon: Shield, title: "Tecnología EMS", desc: "Microcorriente profesional desde casa" },
  ];

  const reviews = [
    { name: "María G.", rating: 5, text: "Lo probé en mi rostro aplicando una crema y hasta me relajé. La mejor compra que he hecho.", date: "14 OCT 2025" },
    { name: "Anónimo", rating: 5, text: "Un mes de uso, mañana y noche durante 1-2 minutos. Mejillas menos hinchadas y piel más firme.", date: "11 NOV 2025" },
    { name: "박언", rating: 5, text: "Es muy bonito y vibra más de lo que esperaba. Puedo controlarlo yo misma. Realmente genial.", date: "20 FEB 2026" },
    { name: "Anónimo", rating: 5, text: "¿Por qué pagar por tratamientos caros cuando esto realmente funciona de maravilla?", date: "28 SEP 2025" },
    { name: "L. J.", rating: 5, text: "La calidad es decente, las vibraciones son intensas. Cambiar las cabezas es sencillo. Lo recomiendo.", date: "03 DIC 2025" },
    { name: "Anónimo", rating: 5, text: "Ideal para lifting facial y masajes. La relación calidad-precio es absolutamente increíble.", date: "10 FEB 2026" },
  ];

  const scrollToProduct = () => document.getElementById("producto")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between py-4">
          <a href="#" className="flex items-center"><img src={logo} alt="Liftéa" className="h-14 md:h-16 w-auto object-contain" width={180} height={64} /></a>
          <div className="hidden md:flex items-center gap-8 text-sm text-charcoal/80">
            <a href="#beneficios" className="hover:text-deep-pink transition-smooth">Beneficios</a>
            <a href="#funciona" className="hover:text-deep-pink transition-smooth">Cómo funciona</a>
            <a href="#opiniones" className="hover:text-deep-pink transition-smooth">Opiniones</a>
            <a href="#faq" className="hover:text-deep-pink transition-smooth">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <CartTrigger count={cartItem?.quantity ?? 0} onClick={() => setCartOpen(true)} />
            <Button variant="luxury" size="sm" onClick={scrollToProduct}>Comprar</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-pink/80 via-soft-pink/40 to-transparent" />
        <div className="container relative grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-soft-gold/40">
              <Sparkles className="w-4 h-4 text-deep-gold" />
              <span className="text-xs tracking-widest uppercase text-charcoal">Belleza profesional</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-charcoal">
              Reduce arrugas y mejora la <span className="text-gradient-rose italic">firmeza</span> en 7 días
            </h1>
            <p className="text-lg text-charcoal/70 max-w-md leading-relaxed">
              Tecnología de microcorriente profesional desde casa. Lifting, EMS y luz LED en un solo dispositivo.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="luxury" size="xl" onClick={scrollToProduct}>
                Comprar ahora <ChevronRight className="ml-1" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex">{[...Array(5)].map((_,i)=><Star key={i} className="w-4 h-4 fill-deep-gold text-deep-gold" />)}</div>
                <span className="text-sm text-charcoal/70">+2.000 clientas felices</span>
              </div>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-rose-gold blur-3xl opacity-30 rounded-full" />
            <img src={productRed} alt="Dispositivo lifting facial Liftéa" className="relative rounded-3xl shadow-luxury w-full" width={600} height={600} />
          </div>
        </div>
      </header>

      {/* Benefits */}
      <section id="beneficios" className="py-24 bg-gradient-soft">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Beneficios</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Una rutina, <span className="italic text-gradient-rose">cinco resultados</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-card rounded-3xl p-8 shadow-soft hover:shadow-luxury transition-smooth border border-soft-pink/40 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-rose-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth">
                  <b.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{b.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Producto */}
      <section id="producto" className="py-24">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-pink blur-3xl opacity-40 rounded-full" />
            <img src={variant === "red" ? productRed : productBlack} alt="Liftéa dispositivo" className="relative rounded-3xl shadow-luxury w-full" width={600} height={600} />
          </div>
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold">Edición limitada</p>
            <h2 className="font-serif text-5xl text-charcoal">Liftéa <span className="italic text-gradient-rose">Pro</span></h2>
            <div className="flex items-center gap-2">
              <div className="flex">{[...Array(5)].map((_,i)=><Star key={i} className="w-5 h-5 fill-deep-gold text-deep-gold" />)}</div>
              <span className="text-sm text-charcoal/60">4.9 · 2.143 reseñas</span>
            </div>
            <p className="text-charcoal/70 leading-relaxed">
              Dispositivo de microcorriente facial con luz roja y azul, vibración EMS y efecto lifting profesional. Resultados visibles en 7 días.
            </p>

            <div className="flex items-baseline gap-4">
              <span className="font-serif text-5xl text-gradient-rose">39,99€</span>
              <span className="text-xl text-charcoal/40 line-through">59,99€</span>
              <span className="px-3 py-1 rounded-full bg-deep-pink/20 text-deep-pink text-xs font-semibold">-33%</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-charcoal/60 uppercase tracking-wider">Color</p>
              <div className="flex gap-3">
                <button onClick={()=>setVariant("red")} className={`px-5 py-3 rounded-2xl border-2 transition-smooth ${variant==="red" ? "border-deep-pink bg-soft-pink/40" : "border-border"}`}>
                  <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-[#a01f2e]" /> Rojo Rubí</span>
                </button>
                <button onClick={()=>setVariant("black")} className={`px-5 py-3 rounded-2xl border-2 transition-smooth ${variant==="black" ? "border-deep-pink bg-soft-pink/40" : "border-border"}`}>
                  <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-charcoal" /> Negro Oro</span>
                </button>
              </div>
            </div>

            <ul className="space-y-2 py-4">
              {["Microcorriente + EMS", "Luz roja y azul LED", "3 cabezales intercambiables", "Batería de larga duración"].map(f=>(
                <li key={f} className="flex items-center gap-2 text-charcoal/80"><Check className="w-4 h-4 text-deep-gold" />{f}</li>
              ))}
            </ul>

            <Button variant="luxury" size="xl" className="w-full" onClick={addToCart}>Añadir al carrito · 39,99€</Button>
            <div className="flex items-center justify-center gap-6 text-xs text-charcoal/60 pt-2">
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío 24-72h</span>
              <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pago seguro</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Garantía 30 días</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="funciona" className="py-24 bg-gradient-soft">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Cómo funciona</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Ciencia + ritual de <span className="italic text-gradient-rose">belleza</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Microcorriente", d: "Estimula los músculos faciales para un lifting natural y duradero." },
              { n: "02", t: "Tecnología EMS", d: "Tonifica y reafirma la piel reactivando la producción de colágeno." },
              { n: "03", t: "Luz Roja & Azul", d: "Roja regenera y suaviza arrugas. Azul purifica y equilibra." },
            ].map(s=>(
              <div key={s.n} className="bg-card rounded-3xl p-10 shadow-soft border border-soft-pink/40 relative overflow-hidden">
                <span className="absolute -top-4 -right-2 font-serif text-9xl text-soft-pink/40">{s.n}</span>
                <h3 className="font-serif text-2xl mb-3 text-charcoal relative">{s.t}</h3>
                <p className="text-charcoal/60 leading-relaxed relative">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-8 md:p-12 shadow-soft border border-soft-pink/40">
            <img src={skinGlow} alt="Piel luminosa" className="rounded-2xl w-full" loading="lazy" width={1024} height={768} />
            <div>
              <h3 className="font-serif text-3xl text-charcoal mb-4">Resultados visibles en <span className="italic text-gradient-rose">7 días</span></h3>
              <p className="text-charcoal/70 leading-relaxed mb-6">Solo 5 minutos al día. Aplica tu sérum favorito y desliza Liftéa siguiendo las líneas de tu rostro y cuello.</p>
              <Button variant="luxury" onClick={scrollToProduct}>Empezar mi ritual</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Liftéa es diferente */}
      <section className="py-24" style={{ background: "#F7DDE2" }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Por qué Liftéa</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">La diferencia está en los <span className="italic text-gradient-rose">detalles</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: Shield, t: "Tecnología segura", d: "Microcorriente clínicamente probada y certificada." },
              { i: Leaf, t: "No invasivo", d: "Sin agujas, sin dolor, sin tiempo de recuperación." },
              { i: BadgeCheck, t: "Apto para todo tipo de piel", d: "Formulado para ser amable con cada tipo de piel." },
              { i: Award, t: "Diseño premium", d: "Materiales de alta calidad y acabado de joyería." },
            ].map((b, i) => (
              <div key={i} className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-white/80 shadow-soft text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-rose-gold flex items-center justify-center mb-4">
                  <b.i className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{b.t}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios con foto */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Testimonios</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Historias de <span className="italic text-gradient-rose">transformación</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carla M.", age: 38, text: "En tres semanas mi piel se ve más firme y luminosa. Es mi nuevo ritual favorito." },
              { name: "Lucía R.", age: 45, text: "Las líneas finas alrededor de los ojos se han suavizado notablemente. Estoy enamorada." },
              { name: "Patricia D.", age: 52, text: "Pensé que necesitaría tratamientos en clínica. Liftéa me ha hecho cambiar de opinión." },
            ].map((t, i) => (
              <div key={i} className="bg-card rounded-3xl p-8 shadow-soft border border-soft-pink/40 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-rose-gold flex items-center justify-center mb-5 ring-4 ring-soft-pink/40">
                  <span className="font-serif text-2xl text-white">{t.name.charAt(0)}</span>
                </div>
                <div className="flex justify-center mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-deep-gold text-deep-gold" />)}</div>
                <p className="text-charcoal/80 italic leading-relaxed mb-5">"{t.text}"</p>
                <p className="font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-charcoal/50">{t.age} años</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía Liftéa */}
      <section className="py-20 bg-gradient-soft">
        <div className="container max-w-3xl">
          <div className="bg-card rounded-3xl p-10 md:p-14 text-center shadow-luxury border border-soft-gold/40 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-rose-gold flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-3">Garantía Liftéa</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">30 días de satisfacción <span className="italic text-gradient-rose">o reembolso</span></h2>
            <p className="text-charcoal/70 leading-relaxed max-w-xl mx-auto">
              Confiamos tanto en Liftéa que te ofrecemos 30 días para probarlo en casa. Si no notas la diferencia, te devolvemos el 100% de tu dinero, sin preguntas. Compra con total tranquilidad.
            </p>
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Opiniones reales</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Más de 2.000 mujeres ya <span className="italic text-gradient-rose">brillan</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r,i)=>(
              <div key={i} className="bg-gradient-soft rounded-3xl p-8 shadow-soft border border-soft-pink/40">
                <div className="flex mb-4">{[...Array(r.rating)].map((_,j)=><Star key={j} className="w-4 h-4 fill-deep-gold text-deep-gold" />)}</div>
                <p className="text-charcoal/80 leading-relaxed mb-5 italic">"{r.text}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-charcoal">{r.name}</span>
                  <span className="text-charcoal/40 text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section className="py-20 bg-gradient-rose-gold">
        <div className="container grid md:grid-cols-3 gap-8 text-white">
          {[
            { i: Truck, t: "Envío 24-72h", d: "A toda España, gratis desde 40€" },
            { i: Lock, t: "Pago 100% seguro", d: "Tarjeta, PayPal y Bizum" },
            { i: Shield, t: "Garantía satisfacción", d: "30 días o te devolvemos tu dinero" },
          ].map((g,i)=>(
            <div key={i} className="text-center">
              <g.i className="w-10 h-10 mx-auto mb-4" />
              <h3 className="font-serif text-2xl mb-2">{g.t}</h3>
              <p className="text-white/80 text-sm">{g.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gradient-soft">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Preguntas frecuentes</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Todo lo que necesitas <span className="italic text-gradient-rose">saber</span></h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "¿Cuánto tarda en verse el resultado?", a: "Notarás un efecto lifting inmediato desde la primera sesión. Los resultados visibles en arrugas y firmeza aparecen entre los 7 y 14 días con uso diario de 5 minutos." },
              { q: "¿Es seguro para la piel?", a: "Sí. Liftéa utiliza microcorriente de baja intensidad, EMS y luz LED, todas tecnologías clínicamente probadas y seguras para uso doméstico en todo tipo de pieles." },
              { q: "¿Cuánto dura la batería?", a: "La batería recargable dura hasta 7 días con uso diario. Se carga por USB en aproximadamente 2 horas." },
              { q: "¿Cómo se usa?", a: "Aplica tu sérum o crema favorita, enciende Liftéa y desliza suavemente sobre el rostro y cuello durante 5 minutos al día." },
              { q: "¿Incluye accesorios?", a: "Sí. Incluye 3 cabezales intercambiables (rostro, ojos y cuello), cable USB y guía de uso." },
            ].map((f,i)=>(
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-2xl px-6 border border-soft-pink/40 shadow-soft">
                <AccordionTrigger className="font-serif text-lg text-charcoal hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-charcoal/70 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="container">
          <div className="bg-gradient-hero rounded-3xl p-12 md:p-20 text-center shadow-luxury relative overflow-hidden">
            <Sparkles className="absolute top-8 left-8 w-8 h-8 text-deep-gold/40" />
            <Sparkles className="absolute bottom-8 right-8 w-8 h-8 text-deep-gold/40" />
            <h2 className="font-serif text-4xl md:text-6xl text-charcoal max-w-3xl mx-auto mb-6">
              Tu ritual de <span className="italic text-gradient-rose">juventud</span> empieza hoy
            </h2>
            <p className="text-charcoal/70 max-w-xl mx-auto mb-8">Aprovecha el lanzamiento con un 33% de descuento. Stock limitado.</p>
            <Button variant="luxury" size="xl" onClick={scrollToProduct}>Comprar Liftéa por 39,99€</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <img src={logo} alt="Liftéa" className="h-10 w-auto" width={150} height={40} loading="lazy" />
            <p className="text-sm text-charcoal/60 max-w-xs">Belleza con ciencia. Tu ritual de juventud desde casa.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-deep-gold mb-3">Información legal</p>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li><Link to="/privacidad" className="hover:text-deep-pink transition-smooth">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-deep-pink transition-smooth">Términos y Condiciones</Link></li>
              <li><Link to="/envios" className="hover:text-deep-pink transition-smooth">Política de Envíos</Link></li>
              <li><Link to="/devoluciones" className="hover:text-deep-pink transition-smooth">Política de Devoluciones</Link></li>
            </ul>
          </div>
          <div className="md:text-right">
            <p className="text-xs tracking-[0.2em] uppercase text-deep-gold mb-3">Contacto</p>
            <p className="text-sm text-charcoal/70">lifteaassistance@gmail.com</p>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t border-border/60 text-center text-xs text-charcoal/50">
          © 2026 Liftéa · Belleza con ciencia
        </div>
      </footer>

      <CartCheckout open={cartOpen} onOpenChange={setCartOpen} item={cartItem} setItem={setCartItem} />
    </div>
  );
};

export default Index;

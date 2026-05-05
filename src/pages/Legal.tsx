import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import logo from "../assets/logo-liftea.png";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalLayout = ({ title, children }: LegalLayoutProps) => (
  <div className="min-h-screen bg-background">
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Liftéa" className="h-10 w-auto" width={150} height={40} />
        </Link>
        <Link to="/" className="text-sm text-charcoal/70 hover:text-deep-pink flex items-center gap-1 transition-smooth">
          <ChevronLeft className="w-4 h-4" /> Volver al inicio
        </Link>
      </div>
    </nav>
    <main className="container max-w-3xl pt-32 pb-20">
      <p className="text-sm tracking-[0.3em] uppercase text-deep-gold mb-4">Información legal</p>
      <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-10">{title}</h1>
      <article className="prose prose-lg max-w-none text-charcoal/80 space-y-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        {children}
      </article>
    </main>
    <footer className="border-t border-border py-8 bg-card">
      <div className="container text-center text-sm text-charcoal/50">© 2026 Liftéa · Belleza con ciencia</div>
    </footer>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout title="Política de Privacidad">
    <p>En Liftéa nos comprometemos a proteger la privacidad de nuestros clientes. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>
    <h2>Datos que recopilamos</h2>
    <ul>
      <li>Nombre completo y datos de contacto (email, teléfono).</li>
      <li>Dirección de envío y facturación.</li>
      <li>Información sobre tu pedido y preferencias de producto.</li>
      <li>Datos de navegación a través de cookies.</li>
    </ul>
    <h2>Uso de la información</h2>
    <p>Utilizamos tus datos exclusivamente para procesar pedidos, gestionar envíos, ofrecer atención al cliente y, cuando lo autorices, enviarte comunicaciones comerciales.</p>
    <h2>Cookies</h2>
    <p>Empleamos cookies técnicas y analíticas para mejorar la experiencia de navegación. Puedes configurarlas o desactivarlas desde tu navegador en cualquier momento.</p>
    <h2>Derechos del usuario</h2>
    <p>Tienes derecho a acceder, rectificar, suprimir, oponerte y solicitar la portabilidad de tus datos. Para ejercer cualquiera de estos derechos, escríbenos a lifteaassistance@gmail.com.</p>
    <h2>Contacto</h2>
    <p>Para cualquier consulta sobre privacidad, puedes contactarnos en <strong>lifteaassistance@gmail.com</strong>.</p>
  </LegalLayout>
);

export const Terms = () => (
  <LegalLayout title="Términos y Condiciones">
    <p>Las siguientes condiciones regulan la compra de productos en Liftéa. Al realizar un pedido aceptas estos términos.</p>
    <h2>Condiciones de compra</h2>
    <p>Para realizar una compra es necesario ser mayor de edad y proporcionar información veraz y completa. Liftéa se reserva el derecho de cancelar pedidos en caso de detectar información incorrecta o fraudulenta.</p>
    <h2>Precios</h2>
    <p>Todos los precios se muestran en euros e incluyen los impuestos aplicables. Los gastos de envío, si los hubiera, se indican antes de finalizar la compra.</p>
    <h2>Envíos</h2>
    <p>Realizamos envíos a toda España en un plazo de 24-72 horas laborables desde la confirmación del pedido. Consulta nuestra Política de Envíos para más detalles.</p>
    <h2>Devoluciones</h2>
    <p>Dispones de 30 días desde la recepción del producto para solicitar una devolución, siempre que el producto se encuentre en perfecto estado.</p>
    <h2>Garantías</h2>
    <p>Todos los dispositivos Liftéa cuentan con garantía oficial de fabricante de 2 años frente a defectos de fabricación.</p>
  </LegalLayout>
);

export const ShippingPolicy = () => (
  <LegalLayout title="Política de Envíos">
    <h2>Tiempo de entrega</h2>
    <p>Los pedidos se preparan en un plazo de 24 horas laborables y se entregan en 24-72 horas tras su salida de almacén.</p>
    <h2>Zonas de envío</h2>
    <p>Realizamos envíos a toda España peninsular, Baleares, Canarias, Ceuta y Melilla. Para envíos internacionales, contacta con nuestro equipo.</p>
    <h2>Costes</h2>
    <ul>
      <li>Envío gratuito en pedidos superiores a 40€.</li>
      <li>Envío estándar peninsular: 3,99€.</li>
      <li>Envío a Baleares y Canarias: tarifa según destino.</li>
    </ul>
    <h2>Seguimiento</h2>
    <p>Una vez enviado tu pedido, recibirás un email con el número de seguimiento para que puedas consultar el estado de tu envío en tiempo real.</p>
  </LegalLayout>
);

export const ReturnsPolicy = () => (
  <LegalLayout title="Política de Devoluciones">
    <h2>Plazo de 30 días</h2>
    <p>Dispones de 30 días naturales desde la recepción del producto para solicitar la devolución, sin necesidad de justificar tu decisión.</p>
    <h2>Condiciones</h2>
    <ul>
      <li>El producto debe estar en perfecto estado, sin signos de uso.</li>
      <li>Debe incluirse el embalaje y los accesorios originales.</li>
      <li>Es necesario adjuntar el ticket o número de pedido.</li>
    </ul>
    <h2>Proceso de devolución</h2>
    <ol className="list-decimal pl-6 space-y-1">
      <li>Escríbenos a <strong>lifteaassistance@gmail.com</strong> indicando tu número de pedido.</li>
      <li>Te facilitaremos las instrucciones y la dirección de devolución.</li>
      <li>Una vez recibido y verificado el producto, procesaremos el reembolso en un plazo máximo de 14 días por el mismo método de pago utilizado.</li>
    </ol>
  </LegalLayout>
);

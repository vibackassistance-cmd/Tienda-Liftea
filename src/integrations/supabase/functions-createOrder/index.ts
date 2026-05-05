import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const NOTIFY_EMAIL = "lifteaassistance@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const required = ["full_name", "email", "phone", "street", "city", "postal_code", "country", "color"];
    for (const f of required) {
      if (!body[f] || typeof body[f] !== "string" || body[f].trim().length === 0) {
        return new Response(JSON.stringify({ error: `Campo requerido: ${f}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    const quantity = Number(body.quantity) || 1;
    const unit = 39.99;
    const total = +(unit * quantity).toFixed(2);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        street: body.street,
        city: body.city,
        postal_code: body.postal_code,
        country: body.country,
        color: body.color,
        quantity,
        total_price: total,
      })
      .select()
      .single();

    if (error) throw error;

    // Send email via Resend gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (LOVABLE_API_KEY && RESEND_API_KEY) {
      const html = `
        <h2>Nuevo pedido Liftéa</h2>
        <p><strong>ID:</strong> ${order.id}</p>
        <h3>Cliente</h3>
        <ul>
          <li><strong>Nombre:</strong> ${body.full_name}</li>
          <li><strong>Email:</strong> ${body.email}</li>
          <li><strong>Teléfono:</strong> ${body.phone}</li>
        </ul>
        <h3>Dirección</h3>
        <p>${body.street}<br/>${body.postal_code} ${body.city}<br/>${body.country}</p>
        <h3>Producto</h3>
        <ul>
          <li><strong>Color:</strong> ${body.color}</li>
          <li><strong>Cantidad:</strong> ${quantity}</li>
          <li><strong>Total:</strong> ${total}€</li>
        </ul>`;

      const r = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "Liftéa <onboarding@resend.dev>",
          to: [NOTIFY_EMAIL],
          subject: `Nuevo pedido Liftéa · ${body.full_name} · ${total}€`,
          html,
          reply_to: body.email,
        }),
      });
      if (!r.ok) console.error("Resend error:", await r.text());
    }

    return new Response(JSON.stringify({ success: true, order_id: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

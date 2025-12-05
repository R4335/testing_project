import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send email to site owner using Resend API directly
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: ["cyph3r@hackermail.dev"], // Change this to your actual email
        subject: `[Portfolio Contact] ${subject} - from ${name}`,
        html: `
          <div style="font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 20px; border: 1px solid #00ff00;">
            <h2 style="color: #00ff00; border-bottom: 1px solid #00ff00; padding-bottom: 10px;">New Contact Form Submission</h2>
            <p><strong style="color: #0ff;">From:</strong> ${name}</p>
            <p><strong style="color: #0ff;">Email:</strong> ${email}</p>
            <p><strong style="color: #0ff;">Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background: #111; border-left: 3px solid #00ff00;">
              <p><strong style="color: #0ff;">Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error(errorData.message || "Failed to send email");
    }

    console.log("Owner email sent successfully");

    // Send confirmation email to sender
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "R4335 <onboarding@resend.dev>",
        to: [email],
        subject: "Message Received - R4335",
        html: `
          <div style="font-family: monospace; background: #0a0a0a; color: #e0e0e0; padding: 30px; max-width: 600px;">
            <div style="border: 1px solid #00ff00; padding: 20px;">
              <h1 style="color: #00ff00; margin: 0 0 20px 0;">// MESSAGE_RECEIVED</h1>
              <p>Hey ${name},</p>
              <p>Thanks for reaching out! I've received your message regarding "<strong style="color: #0ff;">${subject}</strong>".</p>
              <p>I typically respond within <span style="color: #00ff00;">24 hours</span>. If your request is urgent, feel free to mention it in a follow-up.</p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px;">This is an automated confirmation. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.warn("Confirmation email failed, but main email was sent");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

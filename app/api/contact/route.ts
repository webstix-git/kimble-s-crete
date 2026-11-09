import { NextResponse } from "next/server";
import { propertyTypes, serviceOptions } from "@/lib/site";

type EstimateRequest = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  service: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(body: Record<string, unknown>, key: string, max: number) {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: EstimateRequest = {
    name: field(body, "name", 200),
    phone: field(body, "phone", 50),
    email: field(body, "email", 200),
    propertyType: field(body, "propertyType", 20),
    service: field(body, "service", 100),
    message: field(body, "message", 5000),
  };

  if (!data.name || !data.phone || !data.email || !data.service || !data.propertyType) {
    return NextResponse.json(
      { error: "Name, phone, email, property type and project type are required." },
      { status: 422 },
    );
  }
  if (!EMAIL_PATTERN.test(data.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }
  if (!propertyTypes.includes(data.propertyType)) {
    return NextResponse.json({ error: "Invalid property type." }, { status: 422 });
  }
  if (!serviceOptions.includes(data.service)) {
    data.service = "Other";
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    } catch (err) {
      console.error("[contact] Failed to forward estimate request:", err);
      return NextResponse.json(
        { error: "Unable to send your request right now." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] New estimate request:", data);
  }

  return NextResponse.json({ ok: true });
}

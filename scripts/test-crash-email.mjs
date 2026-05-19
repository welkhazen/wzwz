#!/usr/bin/env node
// Run: node scripts/test-crash-email.mjs
// Requires RESEND_API_KEY in environment (or .env.local)

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.local if present
const envLocalPath = resolve(process.cwd(), ".env.local");
if (existsSync(envLocalPath)) {
  for (const line of readFileSync(envLocalPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CRASH_ALERT_TO || "mohammadz20012001@gmail.com";
const FROM = process.env.CRASH_ALERT_FROM || "onboarding@resend.dev";
const APP = process.env.CRASH_ALERT_APP_NAME || "raW";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY. Add it to .env.local and retry.");
  process.exit(1);
}

const payload = {
  from: FROM,
  to: [TO],
  subject: `[${APP}] Crash: Test crash alert`,
  text: [
    `${APP} crash alert`,
    "",
    "Message: Test crash alert",
    "Source: error_boundary",
    "Route: /test",
    "Environment: development",
    "Release: test",
    `Occurred at: ${new Date().toISOString()}`,
    "URL: http://localhost:5173/test",
    "User agent: node-test-script",
    "",
    "Stack:\nError: Test crash alert\n    at scripts/test-crash-email.mjs:1:1",
  ].join("\n"),
};

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { authorization: `Bearer ${RESEND_API_KEY}`, "content-type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.json();
if (res.ok) {
  console.log(`Test crash email sent to ${TO}. ID: ${body.id}`);
} else {
  console.error("Resend error:", body);
  process.exit(1);
}

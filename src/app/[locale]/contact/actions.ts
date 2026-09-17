"use server";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<{ success: true }> {
  // Called server-side — can reach the NestJS backend at the internal URL.
  const apiUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api").replace(
      /\/$/,
      "",
    );

  const res = await fetch(`${apiUrl}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Contact API ${res.status}: ${text}`);
  }

  return { success: true };
}

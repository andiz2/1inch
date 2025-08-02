import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { telegramId, token, targetPrice } = req.body;

  if (!telegramId || !token || typeof targetPrice !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  console.log("📥 New watch submitted:");
  console.log({
    telegramId,
    token,
    targetPrice,
  });

  // Simulate async or storage if needed
  return res.status(200).json({ message: "Watch logged to console" });
}

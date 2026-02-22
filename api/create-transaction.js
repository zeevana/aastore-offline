export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { item, price, uid, server, phone } = req.body;

  const BOT_TOKEN = "7970768014:AAFb9ziUZRL35c9uHmxfkkSgmDC-XWECXtk";
  const CHAT_ID = "6042710123";

  const message = `
🛒 ORDER BARU MASUK

🎮 Game: Genshin Impact
📦 Item: ${item}
💰 Harga: Rp ${price}
🆔 UID: ${uid}
🌍 Server: ${server}
📱 No HP: ${phone}

Status: Siap Diproses
`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Gagal kirim notifikasi" });
  }
}
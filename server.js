import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create-transaction", async (req, res) => {
  try {
    const { game, item, price, formData } = req.body;

    const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

    const formDetails = Object.entries(formData || {})
      .map(([key, value]) => `\n${key}: ${value}`)
      .join("");

    const message = `
🛒 ORDER BARU MASUK

🎮 Game: ${game}
📦 Item: ${item}
💰 Harga: Rp ${Number(price).toLocaleString("id-ID")}

📄 Data User:
${formDetails}

Status: Siap Diproses
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal kirim notifikasi" });
  }
});

app.listen(5000, () => console.log("Server jalan di http://localhost:5000"));
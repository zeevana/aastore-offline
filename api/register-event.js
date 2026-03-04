let participants = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { nickname, userId, serverId } = req.body;

    const newPlayer = {
      id: Date.now(),
      nickname,
      userId,
      serverId
    };

    participants.push(newPlayer);

    return res.status(200).json({ message: "Berhasil daftar", data: newPlayer });
  }

  if (req.method === "GET") {
    return res.status(200).json(participants);
  }
}
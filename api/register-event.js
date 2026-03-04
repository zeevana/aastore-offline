let players = [];

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json(players);
  }

  if (req.method === "POST") {

    const { nickname, userId, serverId } = req.body;

    if (!nickname || !userId || !serverId) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const newPlayer = {
      id: Date.now(),
      nickname,
      userId,
      serverId
    };

    players.push(newPlayer);

    return res.status(200).json(newPlayer);
  }

}
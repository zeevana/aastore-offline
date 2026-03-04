let players = [];

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json(players);
  }

  if (req.method === "POST") {

    const { nickname, userId, serverId } = req.body;

    if (!nickname || !userId || !serverId) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const exist = players.find(p => p.nickname === nickname);

    if (exist) {
      return res.status(400).json({
        error: "Nickname sudah terdaftar"
      });
    }

    const newPlayer = {
      id: Date.now(),
      nickname,
      userId,
      serverId,
      score: Math.floor(Math.random() * 1000)
    };

    players.push(newPlayer);

    players.sort((a, b) => b.score - a.score);

    return res.status(200).json(newPlayer);
  }

  if (req.method === "DELETE") {

    const { id } = req.body;

    players = players.filter(p => p.id !== id);

    return res.json({ success: true });
  }

  if (req.method === "PUT") {

    const { id, nickname } = req.body;

    players = players.map(p => {

      if (p.id === id) {
        return { ...p, nickname };
      }

      return p;
    });

    return res.json({ success: true });
  }

}
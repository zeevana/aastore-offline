export default async function handler(req, res) {

  try {

    const { userId, serverId } = req.body;

    const url = `https://id-game-checker.p.rapidapi.com/mobile-legends/${userId}/${serverId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "40a8e41047msh7798b550140be7ep1c654ajsndc857efa4ec7",
        "x-rapidapi-host": "id-game-checker.p.rapidapi.com"
      }
    });

    const data = await response.json();

    if (!data || !data.username) {

      return res.status(400).json({
        error: "ID MLBB tidak valid"
      });

    }

    res.status(200).json({
      nickname: data.username
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "RapidAPI error"
    });

  }

}
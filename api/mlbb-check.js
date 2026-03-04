export default async function handler(req, res) {

  try {

    let { userId, serverId } = req.body;

    // hapus karakter selain angka
    serverId = serverId.replace(/[^0-9]/g, "");

    const url = `https://id-game-checker.p.rapidapi.com/mobile-legends/${userId}/${serverId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "id-game-checker.p.rapidapi.com"
      }
    });

    const data = await response.json();

    console.log("RapidAPI result:", data);

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
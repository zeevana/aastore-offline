export default async function handler(req, res) {

  try {

    const { userId, serverId } = req.body;

    const response = await fetch(
      "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: "1",
          itemId: "2",
          catalogId: "57",
          paymentId: "352",
          gameId: userId,
          zoneId: serverId
        })
      }
    );

    const data = await response.json();

    if (!data.data) {

      return res.status(400).json({
        error: "ID MLBB tidak valid"
      });

    }

    res.json({
      nickname: data.data.gameDetail.userName
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "MLBB API error"
    });

  }

}
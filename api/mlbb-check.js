export default async function handler(req, res) {

  try {

    const { userId, serverId } = req.body;

    if (!userId || !serverId) {

      return res.status(400).json({
        error: "ID tidak lengkap"
      });

    }

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

    if (!data?.data?.gameDetail?.userName) {

      return res.status(400).json({
        error: "ID MLBB tidak valid"
      });

    }

    res.status(200).json({
      nickname: data.data.gameDetail.userName
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "MLBB API error"
    });

  }

}
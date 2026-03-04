import { Container, Row, Col, Form, Button, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const EventMLBB = () => {

  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");

  const [players, setPlayers] = useState([]);

  const loadLeaderboard = async () => {

    const res = await fetch("/api/get-leaderboard");
    const data = await res.json();

    if (Array.isArray(data)) {
      setPlayers(data);
    }

  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const register = async () => {

    if (!nickname || !userId || !serverId) {
      alert("Isi semua field terlebih dahulu");
      return;
    }

    const res = await fetch("/api/register-event", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        nickname,
        userId,
        serverId
      })

    });

    const data = await res.json();

    if (data.error) {

      alert(data.error);

    } else {

      alert("Berhasil daftar event!");

      setNickname("");
      setUserId("");
      setServerId("");

      loadLeaderboard();

    }

  };

  return (

    <Container className="py-5">

      <Row className="justify-content-center mb-5">

        <Col lg={6}>

          <Card className="shadow border-0">

            <Card.Body className="p-4">

              <h2 className="text-center text-warning mb-4">
                🔥 Event MLBB Starlight
              </h2>

              <Form>

                <Form.Group className="mb-3">

                  <Form.Label>Nickname MLBB</Form.Label>

                  <Form.Control
                    placeholder="Masukkan nickname"
                    value={nickname}
                    onChange={(e)=>setNickname(e.target.value)}
                  />

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>ID MLBB</Form.Label>

                  <Form.Control
                    placeholder="Contoh: 91326804"
                    value={userId}
                    onChange={(e)=>setUserId(e.target.value)}
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>Server ID</Form.Label>

                  <Form.Control
                    placeholder="Contoh: 2185"
                    value={serverId}
                    onChange={(e)=>setServerId(e.target.value)}
                  />

                </Form.Group>

                <div className="d-grid">

                  <Button
                    variant="warning"
                    size="lg"
                    onClick={register}
                  >
                    Daftar Event
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* LEADERBOARD */}

      <Row>

        <Col lg={8} className="mx-auto">

          <h3 className="text-center mb-4">
            Leaderboard Peserta
          </h3>

          <Table striped bordered hover className="text-center">

            <thead>

              <tr>
                <th>#</th>
                <th>Nickname</th>
                <th>ID MLBB</th>
              </tr>

            </thead>

            <tbody>

              {players.map((player,index)=>(

                <tr key={player.id}>

                  <td>

                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}

                  </td>

                  <td>{player.nickname}</td>

                  <td>{player.userId}</td>

                </tr>

              ))}

            </tbody>

          </Table>

        </Col>

      </Row>

    </Container>

  );

};

export default EventMLBB;
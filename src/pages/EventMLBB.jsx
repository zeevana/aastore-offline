import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const EventMLBB = () => {

  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  const checkML = async () => {

    const res = await fetch("/api/mlbb-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        serverId
      })
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      setNickname(data.nickname);
    }

  };

  const register = async () => {

    setLoading(true);

    const res = await fetch("/api/register-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        serverId,
        nickname
      })
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Berhasil daftar event");
      setUserId("");
      setServerId("");
      setNickname("");
    }

    setLoading(false);

  };

  return (

    <Container className="py-5">

      <Row className="justify-content-center">

        <Col lg="6">

          <h2 className="text-center mb-4">
            🔥 Event MLBB Starlight
          </h2>

          <Form>

            <Form.Group className="mb-3">

              <Form.Label>ID MLBB</Form.Label>

              <Form.Control
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>Server ID</Form.Label>

              <Form.Control
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
              />

            </Form.Group>

            <Button
              className="mb-3"
              onClick={checkML}
            >
              Cek Nickname
            </Button>

            {nickname && (

              <div className="alert alert-success">

                Nickname ditemukan:

                <b> {nickname}</b>

              </div>

            )}

            <Button
              variant="warning"
              onClick={register}
              disabled={loading}
            >
              Daftar Event
            </Button>

          </Form>

        </Col>

      </Row>

    </Container>

  );

};

export default EventMLBB;
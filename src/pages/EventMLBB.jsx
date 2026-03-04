import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

const EventMLBB = () => {

  const [form, setForm] = useState({
    nickname: "",
    userId: "",
    serverId: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await fetch("/api/register-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Berhasil daftar event!");

      setForm({
        nickname: "",
        userId: "",
        serverId: ""
      });

    } catch (err) {

      alert("Gagal daftar");

    }

    setLoading(false);

  };

  return (
    <div className="py-5">

      <Container>

        <Row className="justify-content-center">

          <Col lg="6">

            <h2 className="text-center mb-4">
              🔥 Event MLBB Starlight
            </h2>

            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Nickname MLBB</Form.Label>
                <Form.Control
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Server ID</Form.Label>
                <Form.Control
                  type="text"
                  name="serverId"
                  value={form.serverId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="warning"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Mendaftar..." : "Daftar Event"}
              </Button>

            </Form>

          </Col>

        </Row>

      </Container>

    </div>
  );
};

export default EventMLBB;
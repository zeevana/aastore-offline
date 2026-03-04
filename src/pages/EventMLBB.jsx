import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

const EventMLBB = () => {

  const [form, setForm] = useState({
    nickname: "",
    userId: "",
    serverId: ""
  });

  const [loading, setLoading] = useState(false);

  const validateML = () => {

    if (!/^[0-9]{5,12}$/.test(form.userId)) {
      alert("User ID MLBB tidak valid");
      return false;
    }

    if (!/^[0-9]{3,6}$/.test(form.serverId)) {
      alert("Server ID tidak valid");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateML()) return;

    setLoading(true);

    const res = await fetch("/api/register-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Berhasil daftar event!");
      setForm({
        nickname: "",
        userId: "",
        serverId: ""
      });
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

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>Nickname</Form.Label>

              <Form.Control
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                required
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>User ID</Form.Label>

              <Form.Control
                name="userId"
                value={form.userId}
                onChange={handleChange}
                required
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>Server ID</Form.Label>

              <Form.Control
                name="serverId"
                value={form.serverId}
                onChange={handleChange}
                required
              />

            </Form.Group>

            <Button
              variant="warning"
              className="w-100"
              type="submit"
              disabled={loading}
            >

              {loading ? "Mendaftar..." : "Daftar Event"}

            </Button>

          </Form>

        </Col>

      </Row>

    </Container>

  );

};

export default EventMLBB;
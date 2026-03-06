import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import { kelasTerbaru } from "../data/index";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FaqComponent from "../components/FaqComponent";

const HomePage = () => {

  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  // Animasi bubble
  useEffect(() => {

    const bubbles = document.querySelectorAll(".bubble");

    bubbles.forEach((bubble, index) => {
      bubble.style.animationDelay = `${index * 1000}ms`;
    });

  }, []);

  // Ambil leaderboard dari database
  useEffect(() => {

    const loadLeaderboard = async () => {

      try {

        const res = await fetch("/api/get-leaderboard");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPlayers(data);
        }

      } catch (err) {

        console.log("Leaderboard error:", err);

      }

    };

    loadLeaderboard();

  }, []);

  const handleButtonClick = (kelasId) => {
    navigate(`/kelas/${kelasId}`);
  };

  return (

    <div className="homepage">

      {/* HERO */}

      <header className="w-100 min-vh-100 d-flex align-items-center header">

        <Container>

          <Row className="header-box d-flex align-items-center">

            <Col lg="6">

              <h1 className="mb-4">
                Top Up <br />
                <span>Game Murah</span>
                <br />
                Cuma disini!!!
              </h1>

              <p className="mb-4">
                Selamat datang di AaStore, destinasi utama untuk top up game dengan harga terbaik!
              </p>

              <button
                className="btn btn-danger btn-lg me-2"
                onClick={() => navigate("kelas")}
              >
                Lihat List
              </button>

              <button
                className="btn btn-warning btn-lg"
                onClick={() => navigate("/event")}
              >
                Event MLBB
              </button>

            </Col>

            <Col lg="6">
              <img src={HeroImage} alt="hero-img" />
            </Col>

          </Row>

        </Container>

      </header>


      {/* LIST GAME */}

      <div className="kelas py-5">

        <Container>

          <Row>

            <Col>

              <h1 className="text-center fw-bold">
                List Terbaru
              </h1>

              <p className="text-center">
                Daftar Harga Top Up Termurah AaStore
              </p>

            </Col>

          </Row>

          <Row>

            {kelasTerbaru.map((kelas) => (

              <Col lg="3" md="4" sm="6" key={kelas.id}>

                <button
                  className="image-button w-100"
                  onClick={() => handleButtonClick(kelas.id)}
                >

                  <img
                    src={kelas.image}
                    alt={kelas.title}
                    className="w-100 mb-3 rounded"
                  />

                  <h6>{kelas.title}</h6>

                </button>

              </Col>

            ))}

          </Row>

        </Container>

      </div>


      {/* EVENT MLBB */}

      <div className="event-section py-5">

<Container>

<Row className="text-center mb-4">

<Col>

<h2 className="event-title">
🔥 Event MLBB Starlight
</h2>

<p>
Daftar sekarang dan menangkan Starlight Card
</p>

<h5 className="mb-3">
Total Peserta : <b>{players.length}</b>
</h5>

<button
className="btn btn-warning"
onClick={() => navigate("/event")}
>
Daftar Event
</button>

</Col>

</Row>

<Row>

<Col lg="8" className="mx-auto">

<div className="leaderboard-card">

<h4 className="text-center mb-4">

Leaderboard Peserta

</h4>

<div className="table-responsive">

<table className="table leaderboard-table text-center">

<thead>

<tr>
<th>#</th>
<th>Nickname</th>
<th>ID MLBB</th>
</tr>

</thead>

<tbody>

{players.length === 0 && (

<tr>
<td colSpan="3">
Belum ada peserta
</td>
</tr>

)}

{players.map((player, index) => (

<tr key={player._id}>

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

</table>

</div>

</div>

</Col>

</Row>

</Container>

</div>

      <FaqComponent />

    </div>

  );

};

export default HomePage;
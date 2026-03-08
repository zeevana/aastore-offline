import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

const EventMLBB = () => {

  const [nickname,setNickname] = useState("");
  const [userId,setUserId] = useState("");
  const [serverId,setServerId] = useState("");

  const [total,setTotal] = useState(0);
  const [loading,setLoading] = useState(false);

  const loadTotal = async () => {

    try{

      const res = await fetch("/api/get-leaderboard");
      const data = await res.json();

      if(Array.isArray(data)){
        setTotal(data.length);
      }

    }catch(err){
      console.log("load total error",err);
    }

  };

  useEffect(()=>{
    loadTotal();
  },[]);


  const register = async () => {

    if(loading) return;

    if(!nickname || !userId || !serverId){

      alert("Isi semua data");

      return;

    }

    setLoading(true);

    try{

      const res = await fetch("/api/register-event",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          nickname,
          userId,
          serverId
        })

      });

      const data = await res.json();

      if(data.error){

        alert(data.error);

      }else{

        alert("Berhasil daftar!");

        setNickname("");
        setUserId("");
        setServerId("");

        loadTotal();

      }

    }catch(err){

      alert("Server error");

    }

    setLoading(false);

  };



  return(

    <div style={{background:"#f5f5f5",minHeight:"100vh"}}>

      <Container className="py-5">

        <Row className="justify-content-center">

          <Col lg={6} md={8}>

            {/* CARD FORM */}
            <Card className="shadow border-0 mb-4">

              <Card.Body className="p-4">

                <h3 className="text-center mb-3">
                  🔥 Event MLBB Starlight
                </h3>

                <p className="text-center text-muted">
                  Daftar sekarang dan menangkan Starlight Card
                </p>

                <div className="text-center mb-4">

                  <h5>Total Peserta</h5>

                  <h2 style={{color:"#ffb400"}}>
                    {total}
                  </h2>

                </div>

                <Form>

                  <Form.Group className="mb-3">

                    <Form.Label>Nickname MLBB</Form.Label>

                    <Form.Control
                      value={nickname}
                      onChange={(e)=>setNickname(e.target.value)}
                    />

                  </Form.Group>

                  <Form.Group className="mb-3">

                    <Form.Label>ID MLBB</Form.Label>

                    <Form.Control
                      value={userId}
                      onChange={(e)=>setUserId(e.target.value)}
                    />

                  </Form.Group>

                  <Form.Group className="mb-4">

                    <Form.Label>Server ID</Form.Label>

                    <Form.Control
                      value={serverId}
                      onChange={(e)=>setServerId(e.target.value)}
                    />

                  </Form.Group>

                  <div className="d-grid">

                    <Button
                      variant="warning"
                      size="lg"
                      onClick={register}
                      disabled={loading}
                    >

                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2"/>
                          Loading...
                        </>
                      ) : "Daftar Event"}

                    </Button>

                  </div>

                </Form>

              </Card.Body>

            </Card>



            {/* RULES EVENT */}
            <Card className="shadow border-0">

              <Card.Body className="p-4">

                <h4 className="mb-3 text-center">
                  📜 Rules Event
                </h4>

                <ul style={{lineHeight:"1.8"}}>

                  <li>
                    Event ini berlaku pada <b>Season 40 Mobile Legends</b>.
                  </li>

                  <li>
                    Peserta yang <b>pertama kali mencapai rank Mythical Glory</b> akan mendapatkan hadiah <b>Starlight Card</b>.
                  </li>

                  <li>
                    Tidak ada peraturan khusus terkait cara bermain.
                  </li>

                  <li>
                    Peserta <b>diperbolehkan bermain solo maupun melakukan team up</b> dengan peserta lain.
                  </li>

                  <li>
                    Pemenang akan diverifikasi berdasarkan <b>timestamp dan bukti rank</b>.
                  </li>

                  <li>
                    Keputusan penyelenggara bersifat <b>final</b>.
                  </li>

                </ul>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>

  );

};

export default EventMLBB;
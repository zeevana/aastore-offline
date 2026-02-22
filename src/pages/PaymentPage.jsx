import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedItem, kelas, formData } = state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedItem || !kelas) {
    return (
      <div style={{ padding: 40 }}>
        <p>Data tidak ditemukan.</p>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            game: kelas.title,
            item: selectedItem.type,
            price: selectedItem.price,
            formData: formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mendapatkan respons dari server");
      }

      alert("Pesanan berhasil dikirim! Admin akan segera memproses.");
      navigate("/");

    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Detail Pembayaran</h2>

        <div style={styles.productSection}>
          <img
            src={kelas.image}
            alt={kelas.title}
            style={styles.image}
          />
          <h3 style={styles.gameName}>{kelas.title}</h3>
        </div>

        <div style={styles.detailBox}>
          <div style={styles.row}>
            <span>Item</span>
            <strong>{selectedItem.type}</strong>
          </div>

          <div style={styles.row}>
            <span>Harga</span>
            <strong style={styles.price}>
              Rp {selectedItem.price.toLocaleString("id-ID")}
            </strong>
          </div>

          {Object.entries(formData || {}).map(([key, value]) => (
            <div key={key} style={styles.row}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          style={styles.button}
        >
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    borderRadius: 16,
    padding: 30,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  productSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  gameName: {
    margin: 0,
  },
  detailBox: {
    background: "#f9fafb",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 14,
  },
  price: {
    color: "#2563eb",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
    transition: "0.3s",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
};

export default PaymentPage;
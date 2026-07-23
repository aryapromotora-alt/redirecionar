"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const [numbers, setNumbers] = useState<string[]>([""]);
  const [message, setMessage] = useState("Ola!");
  const [status, setStatus] = useState("");
  const [savedUrl, setSavedUrl] = useState("");

  useEffect(() => {
    fetch("/api/numbers")
      .then((r) => r.json())
      .then((data) => {
        if (data.numbers && data.numbers.length > 0) {
          setNumbers(data.numbers);
        }
      });
    setSavedUrl(`${window.location.origin}/api/redirect?msg=${encodeURIComponent("Ola!")}`);
  }, []);

  const addNumber = () => {
    if (numbers.length < 15) {
      setNumbers([...numbers, ""]);
    }
  };

  const removeNumber = (index: number) => {
    const updated = numbers.filter((_, i) => i !== index);
    setNumbers(updated);
  };

  const handleChange = (index: number, value: string) => {
    const updated = [...numbers];
    updated[index] = value;
    setNumbers(updated);
  };

  const handleSave = async () => {
    const filtered = numbers
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (filtered.length === 0) {
      setStatus("Adicione pelo menos 1 numero");
      return;
    }

    if (filtered.length > 15) {
      setStatus("Maximo de 15 numeros");
      return;
    }

    const res = await fetch("/api/numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers: filtered }),
    });

    const data = await res.json();
    if (data.success) {
      setStatus("Numeros salvos com sucesso!");
      setSavedUrl(`${window.location.origin}/api/redirect?msg=${encodeURIComponent(message)}`);
    } else {
      setStatus(data.error || "Erro ao salvar");
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(savedUrl);
    setStatus("Link copiado!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#fff",
      padding: "2rem",
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        padding: "2rem",
      }}>
        <h1 style={{ color: "#22c55e", marginBottom: "0.5rem" }}>
          WA Redirector - Admin
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Cadastre ate 15 numeros de WhatsApp. O sistema distribui os cliques
          automaticamente entre todos os numeros (Round Robin).
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#cbd5e1" }}>
            Mensagem padrao (texto que aparece ao abrir o WhatsApp):
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSavedUrl(`${window.location.origin}/api/redirect?msg=${encodeURIComponent(e.target.value)}`);
            }}
            placeholder="Ola!"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #334155",
              backgroundColor: "#0f172a",
              color: "#fff",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        <h2 style={{ color: "#e2e8f0", fontSize: "1.1rem", marginBottom: "1rem" }}>
          Numeros de WhatsApp ({numbers.length}/15)
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {numbers.map((num, index) => (
            <div key={index} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={num}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="5511999999999"
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              />
              {numbers.length > 1 && (
                <button
                  onClick={() => removeNumber(index)}
                  style={{
                    padding: "0 1rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#dc2626",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>

        {numbers.length < 15 && (
          <button
            onClick={addNumber}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "1px dashed #334155",
              backgroundColor: "transparent",
              color: "#22c55e",
              cursor: "pointer",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              width: "100%",
            }}
          >
            + Adicionar numero
          </button>
        )}

        <button
          onClick={handleSave}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Salvar numeros
        </button>

        {status && (
          <p style={{
            marginTop: "1rem",
            color: status.includes("sucesso") || status.includes("copiado") ? "#22c55e" : "#f87171",
            textAlign: "center",
          }}>
            {status}
          </p>
        )}

        {numbers.filter(n => n.trim()).length > 0 && (
          <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#0f172a", borderRadius: "8px" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#94a3b8", fontSize: "0.85rem" }}>
              Link para usar na Infobip (CTA "Saiba Mais"):
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={savedUrl}
                readOnly
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  backgroundColor: "#1e293b",
                  color: "#22c55e",
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                }}
              />
              <button
                onClick={copyUrl}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Copiar
              </button>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Use este link como URL do botao na Infobip. Use a URL dinamica:{" "}
              <code style={{ color: "#22c55e" }}>
                {`${window.location.origin}/api/redirect/{{1}}`}
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

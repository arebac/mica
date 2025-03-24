import React from "react";
import { useState } from "react";
import styles from "../components/mica.module.css";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Mica = () => {
  const [signature, setSignature] = useState("");
  const [approved, setApproved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [width, height] = useWindowSize();

  const serviceID = import.meta.env.VITE_YOUR_SERVICE_ID;
  const templateID = import.meta.env.VITE_YOUR_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_YOUR_PUBLIC_KEY;
  const receiverEmail = import.meta.env.VITE_RECEIVER_EMAIL;


  const handleSubmit = () => {
    if (signature.trim().toLowerCase() === "maru" && approved) {
      setSubmitted(true);
      setError("");
  
      emailjs
        .send(
          serviceID,
          templateID,
          {
            dog_name: "Mica",
            signer: "Maru",
            message: "Maru has officially approved the co-dad agreement!",
            receiver_email: receiverEmail // 👈 this will receive the email

          },
          publicKey
        )
        .then((res) => {
          console.log("🎉 Email sent!", res);
        })
        .catch((err) => {
          console.error("❌ Email failed:", err);
        });
    } else {
      setError("Maru must sign and approve to proceed!");
    }
  };

  return (
    <>
      {submitted && <Confetti width={width} height={height} />}
      <main className={styles.container}>
        <div className={styles.card}>
          {!submitted ? (
            <>
              <h1 className={styles.title}>🐾 Mica's Co-Dad Agreement</h1>
              <ul className={styles.list}>
                <li>Every other weekend hangouts</li>
                <li>Some holidays (to be negotiated over treats)</li>
                <li>Full belly rub rights</li>
              </ul>
  
              {error && <div className={styles.error}>{error}</div>}
  
              <input
                className={styles.input}
                type="text"
                placeholder="Maru's Signature (Type 'Maru')"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
  
              <label className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={approved}
                  onChange={() => setApproved(!approved)}
                />
                I, Maru, approve this message and co-dad agreement.
              </label>
  
              <button className={styles.button} onClick={handleSubmit}>
                Finalize the Paw-thority 🐾
              </button>
            </>
          ) : (
            <div className={styles.confirmation}>
              🎉 Congratulations, Maru has approved. Memo is the official Co-Dad
              of Mica
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Mica;

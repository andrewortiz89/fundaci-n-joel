import React, { useState } from "react";
import { useTranslation } from "../../contexts/LanguageContext";
import "./Donate.scss";

function DonateButton() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usd");

  const handleDonate = async () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount < 1) {
      alert(t('donaciones.donate.error.invalid'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(numericAmount * 100),
          currency,
          description: `Donación a Fundación Joel`,
        }),
      });

      const data = await response.json();
      console.log("Stripe Response:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(t('donaciones.donate.error.server'));
      }
    } catch (error) {
      alert(t('donaciones.donate.error.general'));
      console.error("Stripe error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="donate-container">
      <div className="donate-controls">
        <input
          type="number"
          min="1"
          placeholder={t('donaciones.donate.amount')}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="donate-input"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="donate-select"
        >
          <option value="usd">USD ($)</option>
          <option value="cop">COP (₱)</option>
          <option value="eur">EUR (€)</option>
        </select>
      </div>

      <button className="donate-btn" disabled={loading} onClick={handleDonate}>
        {loading
          ? t('donaciones.donate.processing')
          : `${t('donaciones.donate.button')} ${amount ? `${amount} ${currency.toUpperCase()}` : ""}`}
      </button>
    </div>
  );
}

export default DonateButton;
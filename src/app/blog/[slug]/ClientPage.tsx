"use client";

import { useState } from "react";

export default function ClientPage() {
  return <NewsletterForm />;
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("Thank you for signing up!");
      setEmail("");
    } else {
      setMessage("There was an error, please try again.");
    }
  };

  return (
    <div className="newsletter-form">
      <h2>Sign up for our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

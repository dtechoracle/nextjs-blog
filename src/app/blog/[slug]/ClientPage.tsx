"use client";

import React, { useState } from "react";

export default function ClientPage() {
	return <NewsletterForm />;
}

function NewsletterForm() {
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const res = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await res.json();

			if (res.ok) {
				setMessage("Thank you for signing up!");
				setEmail("");
			} else {
				setMessage(data.error || "There was an error, please try again.");
			}
		} catch (error) {
			console.error("An unexpected error occurred:", error);
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

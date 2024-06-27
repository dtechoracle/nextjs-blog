"use client";

import React, { useState } from "react";
import CommentPage from "../../comments/[postId]";

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
		<main className="flex-1">
			<section className="bg-gray-100 py-12 px-6 md:px-12">
				<div className="container mx-auto max-w-3xl space-y-6">
					<div>
						<h2 className="text-3xl font-bold mb-2">
							Subscribe to our newsletter
						</h2>
						<p className="text-gray-600">
							Get the latest updates and news from Envitab Blog
						</p>
					</div>

					<form className="flex items-center" onSubmit={handleSubmit}>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							required
							className="flex-1 mr-4"
						/>
						<button
							className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
							type="submit"
						>
							Subscribe
						</button>
					</form>
				</div>
			</section>
			<div>{message && <p className="mb-4">{message}</p>}</div>
		</main>
	);
}

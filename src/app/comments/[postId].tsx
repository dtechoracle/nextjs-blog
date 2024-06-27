"use client";

import { useState, FormEvent } from "react";

export default function CommentPage({ params }: { params: { slug: string } }) {
	const [newComment, setNewComment] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		return (
			<div className="bg-gray-100 p-6 rounded-md">
				<h4 className="text-xl font-bold mb-4">Comments</h4>
				<form onSubmit={handleSubmit}>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						required
					/>
					<button type="submit">Add Comment</button>
				</form>
				) : (<p>You must be logged in to comment.</p>
			</div>
		);
	};
}

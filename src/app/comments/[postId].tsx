import { GetServerSideProps } from "next";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { Post, Comments } from "@prisma/client";
import { auth } from "../../auth";

type Props = {
  post: Post & { comments: Comments[] };
};

export default function PostPage({ post }: Props) {
  const session = auth();
  const [comments, setComments] = useState<Comments[]>(post.comments);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const fetchComments = async () => {
    const res = await fetch(`/api/comments/${id}`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session.user) {
      return alert("You must be logged in to comment");
    }

    const res = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      fetchComments();
    } else {
      alert("Failed to post comment");
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <section>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <small>by {comment.user.name}</small>
            </li>
          ))}
        </ul>

        {session ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>
        ) : (
          <p>You must be logged in to comment.</p>
        )}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params!.id as string) },
    include: { comments: true },
  });

  return { props: { post } };
};

import { fetchBySlug, fetchPageBlocks } from "../../../lib/notion";
import { notion } from "../../../lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
	const post = await fetchBySlug(params.slug);
	if (!post) notFound();

	const blocks = await fetchPageBlocks(post.id);

	const renderer = new NotionRenderer({
		client: notion,
	});

	renderer.use(hljsPlugin({}));
	renderer.use(bookmarkPlugin(undefined));

	const html = await renderer.render(...blocks);

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-gray-900 text-white py-4 px-6 md:px-12">
				<div className="container mx-auto flex items-center justify-between">
					<Link href="#" className="text-2xl font-bold" prefetch={false}>
						Envitab Blog
					</Link>
					<nav className="hidden md:flex items-center space-x-6">
						<Link href="#" className="hover:underline" prefetch={false}>
							Home
						</Link>
						<Link href="#" className="hover:underline" prefetch={false}>
							About
						</Link>
						<Link href="#" className="hover:underline" prefetch={false}>
							Contact
						</Link>
						<Link href="#" className="hover:underline" prefetch={false}>
							Login
						</Link>
						<Link href="#" className="hover:underline" prefetch={false}>
							Signup
						</Link>
					</nav>
					<button className="md:hidden">
						<span className="sr-only">Toggle navigation</span>
					</button>
				</div>
			</header>
			<ClientPage />
			<section className="py-12 px-6 md:px-12">
				<div className="container mx-auto max-w-3xl space-y-8">
					<div>
						<h2 className="text-3xl font-bold mb-2">Latest Blog Post</h2>
						<p className="text-gray-600">Check out our latest blog post</p>
					</div>
					<article>
						<div
							className="prose prose-lg prosw-indigo"
							dangerouslySetInnerHTML={{ __html: html }}
						></div>
					</article>
					<div className="bg-gray-100 p-6 rounded-md">
						<h4 className="text-xl font-bold mb-4">Comments</h4>
						<div className="space-y-4">
							<div className="flex items-start">
								<div>
									<div className="font-medium">Jane Doe</div>
									<p className="text-gray-600">
										This is a great article! I'm really excited to see the
										progress in sustainable energy.
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<div>
									<div className="font-medium">John Smith</div>
									<p className="text-gray-600">
										Excellent overview of the current state of sustainable
										energy. I'm looking forward to seeing what the future holds.
									</p>
								</div>
							</div>
						</div>
						<form className="mt-6">
							<input placeholder="Leave a comment..." className="w-full mb-4" />
							<button
								className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
								type="submit"
							>
								Submit Comment
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

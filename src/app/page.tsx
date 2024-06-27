import Image from "next/image";
import { fetchPages } from "../lib/notion";
import Link from "next/link";

export default async function Home() {
	const posts = await fetchPages();

	return (
		<main className="flex min-h-screen flex-col p-24">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.results.map((post: any) => {
					const cover = post.properties.cover.files[0]; // Adjusting to access files array
					const coverUrl =
						cover.type === "file" ? cover.file.url : cover.external.url;
					const titleText = post.properties.Title.title[0].plain_text;

					console.log(coverUrl); // Debugging
					console.log(titleText); // Debugging

					return (
						<article
							key={post.id}
							className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
						>
							<Link
								href={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
							>
								<Image
									src={coverUrl}
									alt={titleText}
									width={600}
									height={400}
									className="w-full h-auto"
								/>
								<h2 className="p-4 text-xl font-bold text-center">
									{titleText}
								</h2>
							</Link>
						</article>
					);
				})}
			</div>
		</main>
	);
}

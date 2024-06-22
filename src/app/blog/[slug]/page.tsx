import { fetchBySlug, fetchPageBlocks } from "../../../lib/notion";
import { notion } from "../../../lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage";

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
    <div className="p-12">
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }}></div>
      <ClientPage />
    </div>
  );
}

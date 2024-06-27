import { Client } from "@notionhq/client";
import {
	BlockObjectResponse,
	PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React from "react"; // Import React for React features

export const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

export const fetchPages = async () => {
	return await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID!,
		filter: {
			property: "status",
			select: {
				equals: "Live",
			},
		},
	});
};

export const fetchBySlug = async (slug: string) => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID!,
		filter: {
			property: "slug",
			rich_text: {
				equals: slug,
			},
		},
	});

	return response.results[0] as PageObjectResponse | undefined;
};

export const fetchPageBlocks = async (pageId: string) => {
	const response = await notion.blocks.children.list({
		block_id: pageId,
	});

	return response.results as BlockObjectResponse[];
};

import { NextResponse } from "next/server";

export async function GET(request) {
	return NextResponse.json(
		{ message: "Hey dawg Api route is working" },
		{ status: 200 },
	);
}

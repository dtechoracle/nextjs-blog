import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	if (!email || typeof email !== "string") {
		return NextResponse.json(
			{ error: "Invalid email format" },
			{ status: 400 },
		);
	}

	try {
		const newSignup = await prisma.newsletterSignup.create({
			data: { email },
		});
		return NextResponse.json(
			{
				message: "Email added to newsletter successfully",
				data: newSignup,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error.code === "P2002") {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: 400 },
			);
		}
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json(
		{ message: "hey dawg, Welcome to Newslatter" },
		{ status: 200 },
	);
}

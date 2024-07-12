
import { connectDB } from "@/lib/db";
import scrapePrice from "@/lib/scrapePrice";
import PriceTracker from "@/models/PriceTracker";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { url, targetPrice, email } = await request.json();

    if (!url || !targetPrice || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const currentPrice = await scrapePrice(url);

    if (!currentPrice) {
      return NextResponse.json(
        { error: "Failed to scrape price" },
        { status: 500 }
      );
    }

    const tracker = await PriceTracker.create({
      url,
      targetPrice: parseFloat(targetPrice),
      currentPrice: parseFloat(currentPrice.replace(/[^\d.]/g, "")),
      email,
    });

    return NextResponse.json(
      { message: "Price tracker created", tracker },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating price tracker:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

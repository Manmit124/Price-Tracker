import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PriceTracker from "@/models/PriceTracker";
import scrapePrice from "@/lib/scrapePrice";
import sendEmail from "@/lib/sendEmails";
import { createEmailContent } from "@/lib/emailTemplate";


export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const trackers = await PriceTracker.find();

    for (const tracker of trackers) {
      const currentPrice = await scrapePrice(tracker.url);
console.log(currentPrice)
      if (currentPrice) {
        const numericPrice = parseFloat(currentPrice.replace(/[^\d.]/g, ""));

        if (numericPrice <= tracker.targetPrice) {
           
            const emailContent=createEmailContent(
                currentPrice,
                tracker.targetPrice.toString(),
                tracker.url
            )
          await sendEmail(
            tracker.email,
            "Price Alert",
            emailContent
           
          );
          console.log("email sent ")
          await PriceTracker.findByIdAndDelete(tracker._id);
        } else {
            console.log(numericPrice)
          await PriceTracker.findByIdAndUpdate(tracker._id, {
            currentPrice: numericPrice,
          });
          console.log("email not sent")
        }
      }
    }

    return NextResponse.json(
      { message: "Cron job completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

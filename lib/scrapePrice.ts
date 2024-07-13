// // lib/scrapePrice.ts
// import puppeteer from "puppeteer";

// const scrapePrice = async (url: string): Promise<string | null> => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   const price = await page.evaluate(() => {
//     const priceElement = document.querySelector(".Nx9bqj.CxhGGd") as HTMLElement ; // Make sure the selector is correct
//     return priceElement ? priceElement.innerText : null;
//   });
// console.log("run")
//   await browser.close();
//   return price;
// };

// export default scrapePrice;
import { Browser } from "puppeteer";
import { Browser as CoreBrowser } from "puppeteer-core";

const scrapePrice = async (url: string): Promise<string | null> => {
  let browser: Browser | CoreBrowser;

  try {
    if (process.env.NODE_ENV === "production") {
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium-min");

      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    const price = await page.evaluate(() => {
      const priceElement = document.querySelector(
        ".Nx9bqj.CxhGGd"
      ) as HTMLElement;
      return priceElement ? priceElement.innerText : null;
    });

    console.log("Scraping completed");
    return price;
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default scrapePrice;
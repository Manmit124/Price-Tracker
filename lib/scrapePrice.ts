// lib/scrapePrice.ts
import puppeteer from "puppeteer";

const scrapePrice = async (url: string): Promise<string | null> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const price = await page.evaluate(() => {
    const priceElement = document.querySelector(".Nx9bqj.CxhGGd") as HTMLElement ; // Make sure the selector is correct
    return priceElement ? priceElement.innerText : null;
  });
console.log("run")
  await browser.close();
  return price;
};

export default scrapePrice;

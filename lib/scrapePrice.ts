"use server"
// // lib/scrapePrice.ts

// import puppeteer from "puppeteer";
// import puppeteer from "puppeteer-core";

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
  let browser: Browser | CoreBrowser | null=null;

  try {
    if (process.env.NODE_ENV === "production") {
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium-min");

      browser = await puppeteer.launch({
        args: chromium.default.args,
        defaultViewport: chromium.default.defaultViewport,
        executablePath: await chromium.default.executablePath(),
        headless: chromium.default.headless===true,
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // const price:string | null = await page.evaluate(():string | null => {
    //   const priceElement = document.querySelector(
    //     ".Nx9bqj.CxhGGd"
    //   ) as HTMLElement;
    //   return priceElement ? (priceElement as HTMLElement).innerText : null;
    // });
    // const price:string |null = await page.$eval(
    //   ".Nx9bqj.CxhGGd",
    //   (element:Element):string |null => element.textContent
    // );
const price = await(page.evaluate as any)(() => {
  const element = document.querySelector(".Nx9bqj.CxhGGd");
  return element ? element.textContent : null;
}) as string | null;
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
// lib/scrapePrice.ts
// import { Browser, Page } from 'puppeteer-core';

// // const puppeteer = require('puppeteer-core');
// import puppeteer from 'puppeteer-core';

// const getBrowser = (): Promise<Browser> => {
//   return puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3000' });
// };

// const getPage = async (): Promise<{ page: Page; browser: Browser }> => {
//   const browser = await getBrowser();
//   try {
//     const page = await browser.newPage();
//     return { page, browser };
//   } catch (error) {
//     console.error('Error creating new page:', error);
//     throw error;
//   }
// };

// const scrapePrice = async (url: string): Promise<string | null> => {
//   let browser: Browser | null = null;
//   let page: Page | null = null;

//   try {
//     ({ page, browser } = await getPage());
//     await page.goto(url, { waitUntil: 'networkidle0' });
    
//     const price = await page.evaluate(() => {
//       const priceElement = document.querySelector('.Nx9bqj.CxhGGd') as HTMLElement;
//       return priceElement ? priceElement.innerText : null;
//     });

//     console.log('Scraping completed');
//     return price;
//   } catch (error) {
//     console.error('Error during scraping:', error);
//     return null;
//   } finally {
//     if (page) {
//       await page.close();
//     }
//     if (browser) {
//       await browser.disconnect();
//     }
//   }
// };

// export default scrapePrice;
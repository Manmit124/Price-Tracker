// import axios from "axios";
// import * as cheerio from "cheerio";

// const scrapePrice = async (url: string): Promise<string | null> => {
//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Adjust the selector based on the actual structure of the page
//     const priceElement = $(".Nx9bqj.CxhGGd");

//     if (priceElement.length > 0) {
//       return priceElement.text().trim();
//     } else {
//       console.log("Price element not found");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error scraping price:", error);
//     return null;
//   }
// };

// export default scrapePrice;

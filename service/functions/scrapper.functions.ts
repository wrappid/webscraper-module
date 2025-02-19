import {WrappidLogger} from "@wrappid/service-core";
import axios from "axios";
import * as cheerio from "cheerio";


const getlinks = async (req: any) => {

  try {
    const keyword = req.body.keyword;
    const apiKey = ""; // Replace with your Google API key
    const searchEngineId = ""; // Replace with your Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${keyword}&key=${apiKey}&cx=${searchEngineId}`;
  
    const { data } = await axios.get(url);
    const links = data.items.map(item => item.link); // Get all URLs from the search result
    console.log("Search Results:", links);
    return links;
  } catch (error: any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("error in getlinks");
  }
};


// Step 2: Scrape the selected link for information
const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Example: Extract the title of the page
    const title = $("title").text();

    console.log(`Title of ${url}: ${title}`);
    // Extract more specific data based on the website's HTML structure
    return title;
  } catch (error: any) {
    WrappidLogger.error(error);
    throw error;
  }finally{
    WrappidLogger.logFunctionEnd("error in getlinks");
  }
};
export {getlinks,scrapeWebsite};
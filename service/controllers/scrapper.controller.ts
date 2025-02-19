import * as scrapperFunctions from "../functions/scrapper.functions";

const Getlinks = async (req: any, res: any) => {
  try {
    const data: any = await scrapperFunctions.getlinks(req);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

const scrapeWebsite =async (req: any, res: any) => {
  try {
    const data: any = await scrapperFunctions.scrapeWebsite(req);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};


export {
  Getlinks,
  scrapeWebsite
};
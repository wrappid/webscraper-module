import * as cheerio from 'cheerio';

class Scrape {
    private url: string;
    private rawData: string;
    private ids: string[];

    constructor(url: string) {
        this.url = url;
        this.rawData = '';
        this.ids = [];
    }

    async fetchAndExtractIDs(): Promise<{ IDs: { id: string; count: number }[]; rawData: string }> {
        try {
            const response = await fetch(this.url);
            this.rawData = await response.text();

            const $ = cheerio.load(this.rawData);
            this.ids = [];

            $('[id]').each((index, element) => {
                const id = $(element).attr('id');
                if (id) {
                    this.ids.push(id); // Only push non-empty ids
                }
            });

            const idCounts = this.ids.reduce((acc: { [key: string]: number }, id: string) => {
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});

            const idOutput = Object.entries(idCounts).map(([id, count]) => ({ id, count }));

            return { IDs: idOutput, rawData: this.rawData };
        } catch (error) {
            console.error('Error fetching or processing the HTML:', error);
            return { IDs: [], rawData: '' };
        }
    }
}

export default Scrape;
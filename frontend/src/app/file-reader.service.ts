import {Injectable} from '@angular/core';
import * as cheerio from 'cheerio';


@Injectable({
    providedIn: 'root'
})
export class FileReaderService {

    HTML_FILE_EXTENSION = 'html';
    RTF_FILE_EXTENSION = 'rtf';

    RTF_SEPARATION_LINE_REGEX = /^\| +-+\|\s*$/;

    readFile(file: File): Promise<{ header: string[], body: string[][] }> {
        const fileExtension = file.name.split('.').pop();

        if (fileExtension === this.HTML_FILE_EXTENSION) {
            return this.readHtmlFile(file);
        } else if (fileExtension === this.RTF_FILE_EXTENSION) {
            return this.readRtfFile(file);
        } else {
            console.error("unsupported file-format: " + fileExtension);
            return Promise.resolve({header: [], body: [[]]});
        }
    }

    private async readHtmlFile(file: File): Promise<{ header: string[], body: string[][] }> {
        const fileReader = new FileReader();

        return await new Promise((resolve, reject) => {
            fileReader.onload = () => {
                const $ = cheerio.load(fileReader.result!.toString());
                const $headerRow = $('table tr:first-child');
                const headerData = $headerRow.find('th').map((_, th) => $(th)
                    .text()
                    .trim())
                    .get();

                const bodyData = $('table tr:not(:first-child)').map((_, tr) => [
                    $(tr)
                        .find('td')
                        .map((i, el) => $(el).text()).toArray()]
                ).toArray();

                const fileData: { header: string[]; body: string[][] } = {header: [], body: [[]]};
                fileData.header = headerData;
                fileData.body = bodyData;
                resolve(fileData);
            };
            fileReader.onerror = reject;
            fileReader.readAsText(file);
        });
    }

    private async readRtfFile(file: File): Promise<{ header: string[]; body: string[][] }> {
        const fileReader = new FileReader();

        return await new Promise((resolve, reject) => {
            fileReader.onload = () => {
                const trimmedResult = fileReader.result?.toString().trim() || '';
                const lines = trimmedResult.split('\n') || [];

                const headerData = lines[0];
                const headers = headerData.split('|')
                    .map(header => header.trim());

                const bodyData = lines.slice(1)
                    .filter(value => !this.RTF_SEPARATION_LINE_REGEX.test(value))
                    .filter(line => line !== '');

                const body = bodyData
                    .map(line => line.split('|')
                        .map(value => value.trim())
                    );

                const fileData: { header: string[]; body: string[][] } = {header: [], body: [[]]};
                fileData.header = headers;
                fileData.body = body;
                resolve(fileData);
            };
            fileReader.onerror = reject;
            fileReader.readAsText(file);
        });
    }
}

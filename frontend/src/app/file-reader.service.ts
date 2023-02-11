import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileReaderService {

    HTML_FILE_EXTENSION = 'html';
    RTF_FILE_EXTENSION = 'rtf';

    RTF_SEPARATION_LINE_REGEX = /^\| +-+\| $/;

    readFile(file: File): Promise<{ header: string[], body: string[][] }> {
        const fileExtension = file.name.split('.').pop();

        if (fileExtension === this.HTML_FILE_EXTENSION) {
            return this.readHtmlFile();
        } else if (fileExtension === this.RTF_FILE_EXTENSION) {
            return this.readRtfFile(file);
        } else {
            console.error("unsupported file-format: " + fileExtension);
            return Promise.resolve({header: [], body: [[]]});
        }
    }

    private async readHtmlFile(): Promise<{ header: string[], body: string[][] }> {
        return Promise.resolve({header: [], body: [[]]});
    }

    private async readRtfFile(file: File): Promise<{ header: string[]; body: string[][] }> {
        const fileReader = new FileReader();

        return await new Promise((resolve, reject) => {
            fileReader.onload = () => {
                const lines = fileReader.result?.toString().split('\n') || [];

                const headerData = lines[0];
                const headers = headerData.split('|').map(header => header.trim()).filter(value => value !== '');

                const bodyData = lines.slice(1)
                    .filter(value => !this.RTF_SEPARATION_LINE_REGEX.test(value))
                    .filter(line => line !== '');

                const body = bodyData
                    .map(line => line.split('|')
                        .map(value => value.trim())
                        .filter(value => value !== '')
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

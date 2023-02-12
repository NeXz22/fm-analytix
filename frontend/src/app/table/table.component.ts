import {Component} from '@angular/core';
import {FileReaderService} from '../file-reader.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    HEADER_TYPES: { [key: string]: string } = {
        'Name': 'text',
        'Rec': 'text',
        'Inf': 'text',
        'Apps': 'numeric',
        'Gls': 'numeric',
        'Ast': 'numeric',
        'PoM': 'numeric',
        'Pas %': 'numeric',
        'Tck/90': 'numeric',
        'Drb/90': 'numeric',
        'Shot %': 'numeric',
        'Av Rat': 'numeric',
    } as const;

    headers: { label: string, type: string }[] = [];
    filterFields: string[] = [];
    body: string[][] = [[]];

    constructor(
        private fileReaderService: FileReaderService,
    ) {
    }

    onFileChanged(event: Event) {
        let inputElement = event!.target as HTMLInputElement;
        if (inputElement.files) {
            this.fileReaderService.readFile(inputElement.files[0])
                .then(fileContent => {
                    this.filterFields = fileContent.header;
                    this.headers = fileContent.header.map(value => {
                        return {
                            label: value,
                            type: this.getHeaderType(value),
                        }
                    });
                    this.body = fileContent.body.map(value => value.map(value1 => {
                        if (value1 === '-') {
                            return '0';
                        }
                        return value1;
                    }));
                });
        }
    }

    private getHeaderType(headerLabel: string): string {
        return this.HEADER_TYPES[headerLabel];
    }
}

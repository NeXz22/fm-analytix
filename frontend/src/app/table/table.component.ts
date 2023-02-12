import {Component} from '@angular/core';
import {FileReaderService} from '../file-reader.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    HEADER_TYPES: { [key: string]: { filterType: string, valueType: string } } = {
        'Name': {filterType: 'text', valueType: 'text'},
        'Rec': {filterType: 'text', valueType: 'text'},
        'Inf': {filterType: 'text', valueType: 'text'},
        'Apps': {filterType: 'numeric', valueType: 'numeric'},
        'Gls': {filterType: 'numeric', valueType: 'numeric'},
        'Ast': {filterType: 'numeric', valueType: 'numeric'},
        'PoM': {filterType: 'numeric', valueType: 'numeric'},
        'Pas %': {filterType: 'numeric', valueType: 'percent'},
        'Tck/90': {filterType: 'numeric', valueType: 'numeric'},
        'Drb/90': {filterType: 'numeric', valueType: 'numeric'},
        'Shot %': {filterType: 'numeric', valueType: 'percent'},
        'Av Rat': {filterType: 'numeric', valueType: 'rating'},
    } as const;

    headers: { label: string, filterType: string, valueType: string }[] = [];
    filterFields: string[] = [];
    body: (string | number)[][] = [[]];

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
                            filterType: this.getHeaderType(value)?.filterType,
                            valueType: this.getHeaderType(value)?.valueType,
                        }
                    });
                    this.body = fileContent.body.map(line => line.map((columnValue, columnIndex, _columns) => {
                        const header = this.headers[columnIndex];

                        if (header.valueType === 'numeric') {
                            return parseFloat(columnValue) || 0;
                        }

                        if (header.valueType === 'rating') {
                            return parseFloat(columnValue) || 0.00;
                        }

                        if (header.valueType === 'percent') {
                            return parseFloat(columnValue.slice(0, -1)) / 100 || 0;
                        }

                        return columnValue;
                    }));
                });
        }
    }

    private getHeaderType(headerLabel: string): { filterType: string, valueType: string } {
        return this.HEADER_TYPES[headerLabel];
    }
}

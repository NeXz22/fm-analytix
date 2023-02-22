import {Component} from '@angular/core';
import {FileReaderService} from '../file-reader.service';
import {Table} from "primeng/table";

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

        'Pas %': {filterType: 'numeric', valueType: 'percent'},
        'Shot %': {filterType: 'numeric', valueType: 'percent'},
        'Yearly Wage Rise': {filterType: 'numeric', valueType: 'percent'},
        'Top Div Rel Wage Drop': {filterType: 'numeric', valueType: 'percent'},
        'Top Div Prom Wage Rise': {filterType: 'numeric', valueType: 'percent'},
        'Tck R': {filterType: 'numeric', valueType: 'percent'},
        'Sell On Fee % Profit': {filterType: 'numeric', valueType: 'percent'},
        'Sell On Fee %': {filterType: 'numeric', valueType: 'percent'},
        'Sv %': {filterType: 'numeric', valueType: 'percent'},
        'Rel Wage Drop': {filterType: 'numeric', valueType: 'percent'},
        'Prom Wage Rise': {filterType: 'numeric', valueType: 'percent'},
        '% Wages/Sponsor': {filterType: 'numeric', valueType: 'percent'},
        '% Gt. Receipts': {filterType: 'numeric', valueType: 'percent'},
        '% Comp for Mgr Role': {filterType: 'numeric', valueType: 'percent'},
        'Pen/R': {filterType: 'numeric', valueType: 'percent'},
        'Pens Saved Ratio': {filterType: 'numeric', valueType: 'percent'},
        'Hdr %': {filterType: 'numeric', valueType: 'percent'},
        'Gwin': {filterType: 'numeric', valueType: 'percent'},
        'xSv %': {filterType: 'numeric', valueType: 'percent'},
        'xGP/90': {filterType: 'numeric', valueType: 'percent'},
        'xGP': {filterType: 'numeric', valueType: 'percent'},
        'xG/shot %': {filterType: 'numeric', valueType: 'percent'},
        'Cr C/A': {filterType: 'numeric', valueType: 'percent'},
        'Conv %': {filterType: 'numeric', valueType: 'percent'},

        'xG': {filterType: 'numeric', valueType: 'float'},
        'Tgls/90': {filterType: 'numeric', valueType: 'float'},
        'Tcon/90': {filterType: 'numeric', valueType: 'float'},
        'Tck/90': {filterType: 'numeric', valueType: 'float'},
        'Shot/90': {filterType: 'numeric', valueType: 'float'},
        'ShT/90': {filterType: 'numeric', valueType: 'float'},
        'Pr passes/90': {filterType: 'numeric', valueType: 'float'},
        'Pres C': {filterType: 'numeric', valueType: 'float'},
        'Pres A/90': {filterType: 'numeric', valueType: 'float'},
        'Poss Won/90': {filterType: 'numeric', valueType: 'float'},
        'Poss Lost/90': {filterType: 'numeric', valueType: 'float'},
        'Pts/Gm': {filterType: 'numeric', valueType: 'float'},
        'Ps C/90': {filterType: 'numeric', valueType: 'float'},
        'Ps A/90': {filterType: 'numeric', valueType: 'float'},
        'OP-KP/90': {filterType: 'numeric', valueType: 'float'},
        'NP-xG/90': {filterType: 'numeric', valueType: 'float'},
        'NP-xG': {filterType: 'numeric', valueType: 'float'},
        'Last Gl': {filterType: 'numeric', valueType: 'float'},
        'Last C': {filterType: 'numeric', valueType: 'float'},
        'Mins/Gm': {filterType: 'numeric', valueType: 'float'},
        'K Tck/90': {filterType: 'numeric', valueType: 'float'},
        'K Ps/90': {filterType: 'numeric', valueType: 'float'},
        'K Hdrs/90': {filterType: 'numeric', valueType: 'float'},
        'Int Av Rat': {filterType: 'numeric', valueType: 'float'},
        'Int/90': {filterType: 'numeric', valueType: 'float'},
        'Sprints/90': {filterType: 'numeric', valueType: 'float'},
        'Hdrs W/90': {filterType: 'numeric', valueType: 'float'},
        'Gls/90': {filterType: 'numeric', valueType: 'float'},
        'xG/90': {filterType: 'numeric', valueType: 'float'},
        'xG-OP': {filterType: 'numeric', valueType: 'float'},
        'xA/90': {filterType: 'numeric', valueType: 'float'},
        'xA': {filterType: 'numeric', valueType: 'float'},
        'Drb/90': {filterType: 'numeric', valueType: 'float'},
        'Cr C/90': {filterType: 'numeric', valueType: 'float'},
        'Crs A/90': {filterType: 'numeric', valueType: 'float'},
        'Con/90': {filterType: 'numeric', valueType: 'float'},
        'Clr/90': {filterType: 'numeric', valueType: 'float'},
        'Clear': {filterType: 'numeric', valueType: 'float'},
        'Cln/90': {filterType: 'numeric', valueType: 'float'},
        'Ch C/90': {filterType: 'numeric', valueType: 'float'},
        'Blk/90': {filterType: 'numeric', valueType: 'float'},
        'Av Rat': {filterType: 'numeric', valueType: 'float'},
        'Mins/Gl': {filterType: 'numeric', valueType: 'float'},
        'Asts/90': {filterType: 'numeric', valueType: 'float'},
        'Aer A/90': {filterType: 'numeric', valueType: 'float'},

        'Yth Gls': {filterType: 'numeric', valueType: 'decimal'},
        'Yth Apps': {filterType: 'numeric', valueType: 'decimal'},
        'Yel': {filterType: 'numeric', valueType: 'decimal'},
        'Wor': {filterType: 'numeric', valueType: 'decimal'},
        'Vis': {filterType: 'numeric', valueType: 'decimal'},
        'UID': {filterType: 'numeric', valueType: 'decimal'},
        'Thr': {filterType: 'numeric', valueType: 'decimal'},
        'Tec': {filterType: 'numeric', valueType: 'decimal'},
        'Tea': {filterType: 'numeric', valueType: 'decimal'},
        'Tcon': {filterType: 'numeric', valueType: 'decimal'},
        'Tgls': {filterType: 'numeric', valueType: 'decimal'},
        'Tck': {filterType: 'numeric', valueType: 'decimal'},
        'Tck W': {filterType: 'numeric', valueType: 'decimal'},
        'Tck A': {filterType: 'numeric', valueType: 'decimal'},
        'Str': {filterType: 'numeric', valueType: 'decimal'},
        'Starts': {filterType: 'numeric', valueType: 'decimal'},
        'Sta': {filterType: 'numeric', valueType: 'decimal'},
        'ShT': {filterType: 'numeric', valueType: 'decimal'},
        'Shots': {filterType: 'numeric', valueType: 'decimal'},
        'SLAB': {filterType: 'numeric', valueType: 'decimal'},
        'Svt': {filterType: 'numeric', valueType: 'decimal'},
        'Svp': {filterType: 'numeric', valueType: 'decimal'},
        'Svh': {filterType: 'numeric', valueType: 'decimal'},
        'TRO': {filterType: 'numeric', valueType: 'decimal'},
        'Ref': {filterType: 'numeric', valueType: 'decimal'},
        'Red': {filterType: 'numeric', valueType: 'decimal'},
        'Pun': {filterType: 'numeric', valueType: 'decimal'},
        'Pr Passes': {filterType: 'numeric', valueType: 'decimal'},
        // spalte Pres C gibt es doppelt?
        // 'Pres C': {filterType: 'numeric', valueType: 'decimal'},
        'Pres A': {filterType: 'numeric', valueType: 'decimal'},
        'Pref.': {filterType: 'numeric', valueType: 'decimal'},
        'Pos': {filterType: 'numeric', valueType: 'decimal'},
        'PoM': {filterType: 'numeric', valueType: 'decimal'},
        'Pen': {filterType: 'numeric', valueType: 'decimal'},
        'Pens S': {filterType: 'numeric', valueType: 'decimal'},
        'Pens Saved': {filterType: 'numeric', valueType: 'decimal'},
        'Pens Faced': {filterType: 'numeric', valueType: 'decimal'},
        'Pens': {filterType: 'numeric', valueType: 'decimal'},
        'Pas': {filterType: 'numeric', valueType: 'decimal'},
        'Ps C': {filterType: 'numeric', valueType: 'decimal'},
        'Pas A': {filterType: 'numeric', valueType: 'decimal'},
        'Pac': {filterType: 'numeric', valueType: 'decimal'},
        'Opt Ext by Club': {filterType: 'numeric', valueType: 'decimal'},
        'OP-KP': {filterType: 'numeric', valueType: 'decimal'},
        '1 Year Ext Aft Games': {filterType: 'numeric', valueType: 'decimal'},
        '1 Year Ext Rel Aft Games': {filterType: 'numeric', valueType: 'decimal'},
        '1v1': {filterType: 'numeric', valueType: 'decimal'},
        'Off': {filterType: 'numeric', valueType: 'decimal'},
        'OtB': {filterType: 'numeric', valueType: 'decimal'},
        'Nat': {filterType: 'numeric', valueType: 'decimal'},
        'Gl Mst': {filterType: 'numeric', valueType: 'decimal'},
        'Mins': {filterType: 'numeric', valueType: 'decimal'},
        'Mar': {filterType: 'numeric', valueType: 'decimal'},
        'L Th': {filterType: 'numeric', valueType: 'decimal'},
        'Lon': {filterType: 'numeric', valueType: 'decimal'},
        'Ldr': {filterType: 'numeric', valueType: 'decimal'},
        'Kic': {filterType: 'numeric', valueType: 'decimal'},
        'K Tck': {filterType: 'numeric', valueType: 'decimal'},
        'K Pas': {filterType: 'numeric', valueType: 'decimal'},
        'Jum': {filterType: 'numeric', valueType: 'decimal'},
        'Goals': {filterType: 'numeric', valueType: 'decimal'},
        'Caps': {filterType: 'numeric', valueType: 'decimal'},
        'Int Ast': {filterType: 'numeric', valueType: 'decimal'},
        'Int Apps': {filterType: 'numeric', valueType: 'decimal'},
        'Itc': {filterType: 'numeric', valueType: 'decimal'},
        'Hea': {filterType: 'numeric', valueType: 'decimal'},
        'Hdrs': {filterType: 'numeric', valueType: 'decimal'},
        'Han': {filterType: 'numeric', valueType: 'decimal'},
        'Conc': {filterType: 'numeric', valueType: 'decimal'},
        'Gls': {filterType: 'numeric', valueType: 'decimal'},
        'Won': {filterType: 'numeric', valueType: 'decimal'},
        'Lost': {filterType: 'numeric', valueType: 'decimal'},
        'D': {filterType: 'numeric', valueType: 'decimal'},
        'Fre': {filterType: 'numeric', valueType: 'decimal'},
        'Fls': {filterType: 'numeric', valueType: 'decimal'},
        'FA': {filterType: 'numeric', valueType: 'decimal'},
        'Fla': {filterType: 'numeric', valueType: 'decimal'},
        'Fir': {filterType: 'numeric', valueType: 'decimal'},
        'Fin': {filterType: 'numeric', valueType: 'decimal'},
        'Ecc': {filterType: 'numeric', valueType: 'decimal'},
        'Dri': {filterType: 'numeric', valueType: 'decimal'},
        'Drb': {filterType: 'numeric', valueType: 'decimal'},
        'Det': {filterType: 'numeric', valueType: 'decimal'},
        'Dec': {filterType: 'numeric', valueType: 'decimal'},
        'Days Old': {filterType: 'numeric', valueType: 'decimal'},
        'Cro': {filterType: 'numeric', valueType: 'decimal'},
        'Cr C': {filterType: 'numeric', valueType: 'decimal'},
        'Cr A': {filterType: 'numeric', valueType: 'decimal'},
        'Cor': {filterType: 'numeric', valueType: 'decimal'},
        'Cnt': {filterType: 'numeric', valueType: 'decimal'},
        'Cmp': {filterType: 'numeric', valueType: 'decimal'},
        'Com': {filterType: 'numeric', valueType: 'decimal'},
        'Cmd': {filterType: 'numeric', valueType: 'decimal'},
        'CCC': {filterType: 'numeric', valueType: 'decimal'},
        'Clean sheets': {filterType: 'numeric', valueType: 'decimal'},
        'Bra': {filterType: 'numeric', valueType: 'decimal'},
        'Blk': {filterType: 'numeric', valueType: 'decimal'},
        'Bal': {filterType: 'numeric', valueType: 'decimal'},
        'Ast': {filterType: 'numeric', valueType: 'decimal'},
        'Apps': {filterType: 'numeric', valueType: 'decimal'},
        'Ant': {filterType: 'numeric', valueType: 'decimal'},
        'AT Lge Gls': {filterType: 'numeric', valueType: 'decimal'},
        'AT Lge Apps': {filterType: 'numeric', valueType: 'decimal'},
        'AT Gls': {filterType: 'numeric', valueType: 'decimal'},
        'AT Apps': {filterType: 'numeric', valueType: 'decimal'},
        'Agi': {filterType: 'numeric', valueType: 'decimal'},
        'Agg': {filterType: 'numeric', valueType: 'decimal'},
        'Age': {filterType: 'numeric', valueType: 'decimal'},
        'Aer': {filterType: 'numeric', valueType: 'decimal'},
        'Hdrs A': {filterType: 'numeric', valueType: 'decimal'},
        'Acc': {filterType: 'numeric', valueType: 'decimal'},
    } as const;

    headers: { label: string, filterType: string, valueType: string }[] = [];
    filterFields: string[] = [];
    body: (string | number)[][] = [[]];

    regexes = [
        /\d+(\.\d+)?%/, // percent
        /^\d+\.\d+$/, // floating point (.. x.x ..)
        /^\d+$/, // decimals
    ];

    enableResizableColumns: boolean = false;


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

                        if (header.valueType === 'decimal') {
                            return parseFloat(columnValue) || 0;
                        }

                        if (header.valueType === 'float') {
                            return parseFloat(columnValue) || 0;
                        }

                        if (header.valueType === 'percent') {
                            return (parseFloat(columnValue.slice(0, -1)) / 100) || 0;
                        }

                        return columnValue;
                    }));

                    // this.calcColumnDataTypes();
                });
        }
    }

    private getHeaderType(headerLabel: string): { filterType: string, valueType: string } {
        return this.HEADER_TYPES[headerLabel];
    }

    private calcColumnDataTypes(): void {

        // iterate over each column
        let str = '';
        this.headers.forEach((column, columnIndex, columns) => {
            const dataTypeMap = new Map();
            // iterate over each row
            this.body.forEach((row, rowIndex, rows) => {
                const cell = row[columnIndex];
                const dataTypeIndex = this.getDataType('' + cell);

                if (dataTypeIndex !== -1) {
                    const dataTypeCounter = dataTypeMap.get(dataTypeIndex) || 0;
                    dataTypeMap.set(dataTypeIndex, dataTypeCounter + 1);
                }
            });

            const regexesDataTypeIndex = this.findHighestDataTypeCounter(dataTypeMap);
            if (regexesDataTypeIndex === 2) {
                str += '\'' + this.headers[columnIndex].label + '\'\: {filterType: \'numeric\', valueType: \'decimal\'},';
            }
        });
        console.log(str);
    }

    private getDataType(value: string) {
        for (let i = 0; i < this.regexes.length; i++) {
            if (this.regexes[i].test(value)) {
                return i;
            }
        }
        return -1;
    }

    private findHighestDataTypeCounter(dataTypeMap: Map<number, number>) {
        let mostFrequentDataType = -1;
        let highestCount = -1;

        for (const [dataType, count] of dataTypeMap.entries()) {
            if (count > highestCount) {
                mostFrequentDataType = dataType;
                highestCount = count;
            }
        }

        return mostFrequentDataType;
    }

    clear(table: Table) {
        table.clear();
    }
}

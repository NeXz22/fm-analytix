import {Pipe, PipeTransform} from '@angular/core';
import {TableHeader} from "./table-header";

@Pipe({
    name: 'headerLabel'
})
export class HeaderLabelPipe implements PipeTransform {

    transform(tableHeaderArray: TableHeader[]): string[] {
        return tableHeaderArray.map(tableHeader => tableHeader.label);
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import {TableHeader} from "./table-header";

@Pipe({
    name: 'sortByOrderIndex'
})
export class SortByOrderIndexPipe implements PipeTransform {

    transform(headerArray: TableHeader[]): TableHeader[] {
        return [...headerArray].sort((a, b) => a.orderIndex < b.orderIndex ? -1 : 1);
    }
}

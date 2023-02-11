import {Component} from '@angular/core';
import {FileReaderService} from '../file-reader.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    headers: string[] = [];
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
                    this.headers = fileContent.header;
                    this.body = fileContent.body;
                });
        }
    }
}

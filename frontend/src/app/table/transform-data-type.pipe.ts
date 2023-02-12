import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'transformDataType'
})
export class TransformDataTypePipe implements PipeTransform {

    transform(value: (string | number), valueType: string): unknown {
        if (valueType === 'percent') {
            return ((value as number) * 100).toFixed(0) + '%';
        }

        if (valueType === 'rating') {
            return (value as number).toFixed(2);
        }

        return value;
    }

}

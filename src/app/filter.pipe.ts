import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

  if (!items) {
    return [];
  }
  if (!searchText ) {
    return items;
  }   
  return items.filter(it => {
    return ((it.itemPrice.toString().search(searchText.toLowerCase()) >= 0)|| (it.itemDescription.toLowerCase().search(searchText.toLowerCase()) >= 0) || (it.itemName.toLowerCase().search(searchText.toLowerCase()) >= 0) || (it.itemAdditionDate.toLowerCase().search(searchText.toLowerCase()) >= 0));
  });
   
}
}
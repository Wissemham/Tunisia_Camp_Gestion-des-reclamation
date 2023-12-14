import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.title.toLowerCase().includes(searchText) ||
             item.category.toLowerCase().includes(searchText) ||
             item.content.toLowerCase().includes(searchText)||
             item.creation.includes(searchText);
    });
  }
}

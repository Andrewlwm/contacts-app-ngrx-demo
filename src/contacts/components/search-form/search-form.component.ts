import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  searchField: string | undefined;
  @Output() search = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  searched(value: string) {
    this.search.emit(value);
  }
}

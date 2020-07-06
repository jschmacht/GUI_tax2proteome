import { Component, OnInit,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {TaxName} from "../input-page/input-page.component";
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-tax-autocomplete',
  templateUrl: './tax-autocomplete.component.html',
  styleUrls: ['./tax-autocomplete.component.css']
})

export class TaxAutocompleteComponent implements OnInit {
  searchTaxonCtrl = new FormControl();
  filteredTaxa: any;
  isLoading = false;
  errorMsg: string;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.searchTaxonCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredTaxa = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get("http://autocomplete.tax2proteome.de/query.php?q=" + value + "&limit=5")
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.errorMsg = "";
        this.filteredTaxa = data;
      });
  }

  displayName(taxon: {taxid: number, name:string}): string {
    return taxon && taxon.name ? taxon.name : '';
  }

  sendTaxEntry(selectedTaxon) {
    this.searchTaxonCtrl.setValue('');
    console.log(selectedTaxon)
    this.messageEvent.emit(selectedTaxon)
  }
}

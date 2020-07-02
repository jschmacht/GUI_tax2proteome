import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import names from "../../assets/names_small.json";
//import names2 from "../../assets/names.json";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface TaxName {
  taxID: number;
  name: string;
  rank: string;
}

@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})

export class InputPageComponent implements OnInit {
  myControl = new FormControl();
  options: TaxName[] = names;
  filteredOptions: Observable<TaxName[]>;
  options2: string[] = [];
  selectedOptions:Set<TaxName> = new Set()
  chosenDatabase: string;
  databases: string[] = ['Uniprot', 'NCBI-nr', 'Swissprot'];
  displayedColumns: string[] = ['taxID', 'name', 'rank'];
  dataSource = new MatTableDataSource<TaxName>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('bindingInput') bindingInput: ElementRef;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name.length >= 1 ? this._filter(name) : [])
    );
  }

  displayName(taxname: TaxName): string {
    return taxname && taxname.name ? taxname.name : '';
  }

  private _filter(name: string): TaxName[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addName(value: TaxName): void {
    this.selectedOptions.add(value);
    this.myControl.setValue('');
    this.refreshTable();

  }

  getTaxIDValue(): any {
    let splitted = this.bindingInput.nativeElement.value.split(/\s*[,;]\s*|\s/);
    let arrayOfTaxIDs = splitted.map(Number)
    console.log(arrayOfTaxIDs)
    arrayOfTaxIDs.forEach((taxID) => {
      let taxObject = this.options.find(x => x.taxID === taxID);
      console.log(taxID);
      if (taxObject!==undefined){
        this.selectedOptions.add(taxObject);
        this.refreshTable()
      }
    });
  }

  refreshTable() {
        this.dataSource.data = [...this.selectedOptions];
    }
}

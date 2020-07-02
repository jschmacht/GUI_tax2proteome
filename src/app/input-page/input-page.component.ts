import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import names from "../../assets/names_small.json";
//import names2 from "../../assets/names.json";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../api.service';

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
  selectedDatabase: string = 'Uniprot';
  selectedRank:string='species';
  databases: string[] = ['Uniprot', 'NCBI-nr', 'Swissprot'];
  ranks: string[] = ['species', 'genus', 'order', 'class', 'kingdom', `superkingdom`]
  displayedColumns: string[] = ['taxID', 'name', 'rank'];
  dataSource = new MatTableDataSource<TaxName>([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('bindingInput') bindingInput: ElementRef;
  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name.length >= 1 ? this._filter(name) : [])
    );
    /*this.apiService.getNews().subscribe((data)=>{
      console.log(data)
    });*/
  }

  displayName(taxname: TaxName): string {
    return taxname && taxname.name ? taxname.name : '';
  }

  private _filter(name: string): TaxName[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addName(taxObject: TaxName): void {
    this.myControl.setValue('');
    this.refreshTable(taxObject);

  }

  getTaxIDValue(): any {
    let splitted = this.bindingInput.nativeElement.value.split(/\s*[,;]\s*|\s/);
    let arrayOfTaxIDs = splitted.map(Number)
    arrayOfTaxIDs.forEach((taxID) => {
      let taxObject = this.options.find(x => x.taxID === taxID);
      if (taxObject!==undefined){
        this.refreshTable(taxObject)
      }
    });
  }

  refreshTable(taxObject) {
    this.selectedOptions.add(taxObject);
    this.dataSource.data = [...this.selectedOptions];
    }

  deleteSelectedTaxIDs(){
    this.selectedOptions = new Set<TaxName>();
    this.dataSource.data = [...this.selectedOptions];
  }

  sendGetRequest(){
    console.log(this.selectedRank);
    console.log(this.selectedDatabase);
    let taxIDs:string='?taxid=';
    this.selectedOptions.forEach((item) => {
      taxIDs = taxIDs + ',' + item.taxID;
    });
    console.log(taxIDs)
    //taxIDs.splice(, 1);
    let urlRequest: string;
  }
}

import { Component, OnInit } from '@angular/core';
// import { IDropdownSettings, IDropdownSettings, IDropdownSettings } from 'ng-multiselect-dropdown';
import { SelectItem } from "primeng/api";
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { TableService } from 'src/app/services/table.service';


@Component({
  selector: 'app-dynamic-query-builder',
  templateUrl: './dynamic-query-builder.component.html',
  styleUrls: ['./dynamic-query-builder.component.scss']
})
export class DynamicQueryBuilderComponent implements OnInit {
  dropdownSettings = {};
tableList: any;
selectedParentTable:any;

tableColumnList : any;
parentTableColumnList: any;


selectedJoinTable : any;
joinTableReferenceColumnList: any;
selectedJoinTableColumns : any;
selectedJoinParentTable:any;
selectedJoinParentTableReferenceColumn: any;
joinParentTableColumnList: any;
joinTableColumnToShowList : any;


joinTableColumnsToShow: any;

selectedConditionTable:any;
selectedConditionColumn:any;

conditionTableColumnList:any;
conditionTypeList:any;
selectedConditonType:any;
condtionValue:any;
selectedValueType:any;
valueTypeList:any;

selectedParentTableColumns: string[] = [];
  constructor(public tableService: TableService,) { }

  ngOnInit(): void {
    // this.dropdownSettings : IDropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };

this.tableService.getTables().subscribe((data: any) => {
  this.tableList = data;
});

    // this.tableList = [
    //   { name: "Supplier" },
    //   { name: "Payer" },
    //   { name: "Order" },
    // ];

    this.tableColumnList = [
      { name: "Id", id: "1" },
      { name: "Name" , id: "2" },
      { name: "IsActive" , id: "3" },
      { name: "Quantity" , id: "4" },
      { name: "SupplierId" , id: "5" }
    ];

    this.conditionTypeList = [
      { name: ">", id: "1" },
      { name: "<" , id: "2" },
      { name: "=" , id: "3" },
    ];

    this.valueTypeList = [
      { name: "int", id: "1" },
      { name: "string" , id: "2" },
    ]

  }
  onParentTableChange(event)
  {
    let val = event.value;
    console.log(event.value);
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.parentTableColumnList = data;
    });
  }
  onJoinTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.joinTableReferenceColumnList = data;
      this.joinTableColumnToShowList = data;
    });
  }
  onJoinParentTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.joinParentTableColumnList = data;
    });
  }


  onConditionTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.conditionTableColumnList = data;
    });
  }

}

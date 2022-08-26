import { DataSourceField } from "./dataSourceField";
import { PtreeTable } from "./ptreeTable";
import { TableFields } from "./tableField";

export class PtreeChildren {
    label: string;
    data: DataSourceField;
    expandedIcon: string;
    collapsedIcon: string;
    children: any[]=[] ;
    parent:PtreeTable;
    
  }
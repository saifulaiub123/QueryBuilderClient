import { PtreeChildren } from "./ptreeChildren";
import { Table } from "./table";

export class PtreeTable {
    children: PtreeChildren[];
    label : string;
    data : Table;
    expandedIcon: string;
    expanded:true;
    collapsedIcon: string;
     
    parent:undefined=undefined;

  }
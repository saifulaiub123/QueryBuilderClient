import { OrderBy } from "./orderBy";
import { Table } from "./table";
import { TableFields } from "./tableField";

export class OrderByModel {
    operatorLogique:string;
    table:Table;
    champ:TableFields;
    direction:string;
    tableField:TableFields[];
    orderBy:OrderBy=new OrderBy();
  }
  
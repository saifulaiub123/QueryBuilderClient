import { DataSourceField } from "./dataSourceField";
import { OrderBy } from "./orderBy";
import { Table } from "./table";
import { TableFields } from "./tableField";

export class GroupByModel {
  operatorLogique:string;
  table:Table;
  champ:TableFields;
  tableField:TableFields[];
  groupByE:DataSourceField;
}

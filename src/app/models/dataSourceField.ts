import { DataSource } from "./dataSource";
import { Ffunction } from "./function";
import { TableFields } from "./tableField";



export class DataSourceField {
  id: number;
  designation : string;
  calculatedField : boolean;
  alias : string;
  order : number;
  groupBy : boolean;
  tableField : TableFields;
  function : Ffunction;
  dataSource : DataSource;
  
}

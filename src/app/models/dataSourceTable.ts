import { DataSource } from "./dataSource";
import { Join } from "./join";
import { Table } from "./table";



export class DataSourceTable {
  id: number;
  order : number;
  join : Join
  table : Table; 
  dataSource : DataSource;
  alias : string;
  mainEntity : boolean;
  
}

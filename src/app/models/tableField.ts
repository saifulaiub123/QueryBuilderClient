import {Table} from '../models/table'

export class TableFields {
    id: number;
    designation : string;
    isList : boolean;
    name : string; 
    table : Table;
    referenceField : TableFields;
  }
  
import { DataSourceField } from "./dataSourceField";
import { DataSourceTable } from "./dataSourceTable";
import { Ooperator } from "./operator";
import { TableFields } from "./tableField";

export class ExpressionTerm {
    id: number;
    fieldsDataSource : DataSourceField;
    firstTerm : ExpressionTerm;
    secondTerm : ExpressionTerm;
    expressionType : string;
    operator : Ooperator;
    tableField : TableFields;
    dataSourceTable : DataSourceTable;
    dataSourceField : DataSourceField;
    order : number;
    text : string;
    
    
  }
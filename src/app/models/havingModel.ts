import { ExpressionTerm } from "./expressionTerm";
import { Ffunction } from "./function";
import { Ooperator } from "./operator";
import { Table } from "./table";
import { TableFields } from "./tableField";

export class HavingModel {
    EtOu:boolean;
    operator1:string;
    OperatorID:number;
    table:Table;
    function:Ffunction;
    champ:TableFields;
    operator2:Ooperator;
    value:string;
    tableField:TableFields[];
    havingE:ExpressionTerm=new ExpressionTerm();
    update:Boolean=false;
    parenthesis:boolean = false;
    closeParanth:Boolean = false;
  }
  
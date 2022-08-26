import { ExpressionTerm } from "./expressionTerm";
import { Join } from "./join";
import { Ooperator } from "./operator";
import { Table } from "./table";
import { TableFields } from "./tableField";

export class JoinModel {
    etou : boolean;
    Orerator1:string;
    type:Join;
    tablePrincipale:Table;
    champ1:TableFields;
    operator2:Ooperator;
    joinedTable:Table;
    champ2:TableFields;
    tableField:TableFields[];
    tableField1:TableFields[];
    joinE:ExpressionTerm=new ExpressionTerm();
    update:Boolean=false;

    
  }
  
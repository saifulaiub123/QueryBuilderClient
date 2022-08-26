import { Condition } from './condition';
import { ExpressionTerm } from './expressionTerm';
import { Ooperator } from './operator';
import { Table } from './table';
import { TableFields } from './tableField';

export class WhereModel {
    etou:boolean;
    operator1:string;
    OperatorID:number;
    table:Table;
    champ:TableFields;
    operator2:Ooperator;
    value:string;
    condition:Condition=new Condition()
    values:Condition[]=[this.condition];
    tableField:TableFields[];
    whereE:ExpressionTerm=new ExpressionTerm();
    update:Boolean=false;
    oneValueCondition = true;
    parenthesis:boolean = false;
    closeParanth: boolean = false;
  
  }
  


import { Join } from "./join";
import { Ooperator } from "./operator";
import { Table } from "./table";
import { TableFields } from "./tableField";

export class JoinExpressionTermModel {

    type:Join;
    tablePrincipale:Table;
    champ1:TableFields;
    operator2:Ooperator;
    joinedTable:Table;
    champ2:TableFields;


  }

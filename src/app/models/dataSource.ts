import { Classification } from "./classification";
import { DataSourceField } from "./dataSourceField";
import { ExpressionTerm } from "./expressionTerm";

export class DataSource {
  id: number;
  designation : string;
  sqlText : string; 
  distinct : boolean;
  classification : Classification;
  whereCondition : ExpressionTerm;
  havingCondition : ExpressionTerm;
  dataSourceFields : DataSourceField[];
 
}

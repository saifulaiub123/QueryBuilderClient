import { DynamicCondition } from "./dynamicCondition";

export class DynamicQueryModel {
  tableName: string;
  columns : string[];
  joinTables : any[];
  whereConditions : DynamicCondition[]
}

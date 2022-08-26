import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ooperator } from '../models/operator';
import { ExpressionTerm } from '../models/expressionTerm';





@Injectable({ providedIn: 'root' })
export class ExpressionTermService {

  readonly expressionTermUrl = environment.API_URL + 'api/ExpressionTerms';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * GET operators from the server
   */
  getOperator(): Observable<Ooperator[]> {
    return this.http.get<Ooperator[]>(this.expressionTermUrl + '/Operator');
  }

  /**
   * update ExpressionTerm in database 
   * @param expressionTerm 
   * @returns 
   */
  UpdateExpressionTerm(expressionTerm: ExpressionTerm): Observable<any> {
    return this.http.put<ExpressionTerm>(this.expressionTermUrl + "/" + expressionTerm.id, expressionTerm);
  }

  /**
   * GET all join expressionTerm of a query from the server
   * @param id 
   * @returns 
   */
  getJoinsExpressionTerm(id: number): Observable<ExpressionTerm> {
    return this.http.get<ExpressionTerm>(this.expressionTermUrl + "/JoinC/" + id);
  }

  /**
   * GET all where and having  expressionTerm of a query from the server
   * @param id 
   * @returns 
   */
  getJoinsWhereHavingExpressionTerm(id: number): Observable<ExpressionTerm[]> {
    return this.http.get<ExpressionTerm[]>(this.expressionTermUrl + "/WhereHaving/" + id);
  }

  /**
   * delete expressionTerm in database 
   * @param id 
   * @returns 
   */
  DeleteExpressionTerm(id: number): Observable<ExpressionTerm> {
    return this.http.delete<ExpressionTerm>(this.expressionTermUrl + "/" + id);
  }

  /**
   * save expression term in database 
   * @param expressionTerm 
   * @returns 
   */
  SaveExpressionTerm(expressionTerm: ExpressionTerm): Observable<ExpressionTerm> {
    return this.http.post<ExpressionTerm>(this.expressionTermUrl, expressionTerm);
  }
}

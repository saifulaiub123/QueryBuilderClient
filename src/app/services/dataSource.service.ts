import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classification } from '../models/classification';
import { DataSource } from '../models/dataSource';
import { OrderBy } from '../models/orderBy';
import { DataSourceTable } from '../models/dataSourceTable';





@Injectable({ providedIn: 'root' })
export class DataSourceService {

  readonly dataSourceUrl = environment.API_URL + 'api/DataSources';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
  * GET datasources from the server
  */
  getAllDataSource(): Observable<DataSource[]> {

    return this.http.get<DataSource[]>(this.dataSourceUrl);
  }

  /**
   * GET all classifications from the server
   */
  getAllClassifications(): Observable<Classification[]> {
    return this.http.get<Classification[]>(this.dataSourceUrl + '/Classifications');
  }

  /**
   * get data depending en sql query created by user 
   * @param sql 
   * @returns 
   */
  getDataRequest(sql: string): Observable<any[]> {
    return this.http.post<any[]>(this.dataSourceUrl + '/DataRequest', sql, {
      headers: { 'Content-type': 'application/json; charset=utf-8' }
    });
  }


  /**
  * GET order by Filters of a query from the server
  */
  getDataSourceOrderBys(id: number): Observable<OrderBy[]> {
    return this.http.get<OrderBy[]>(this.dataSourceUrl + "/OrderBys/" + id);
  }

  /**
   * GET dataSource  from the server
   */
  getDataSource(id: number): Observable<DataSource> {
    return this.http.get<DataSource>(this.dataSourceUrl + "/" + id);


  }
  /**
   * save dataSource in database 
   */
  SaveDataSource(dataSource: DataSource): Observable<DataSource> {
    return this.http.post<DataSource>(this.dataSourceUrl, dataSource);
  }

  /**
   * update dataSource in database 
   */
  UpdateDataSource(dataSource: DataSource): Observable<any> {
    return this.http.put<DataSource>(this.dataSourceUrl + "/" + dataSource.id, dataSource);
  }

  /**
   * update orderBy in database 
   */
  UpdateOrderBy(orderBy: OrderBy): Observable<any> {
    return this.http.put<OrderBy>(this.dataSourceUrl + "/OrderBy/" + orderBy.id, orderBy);
  }
  /**
  * delete dataSource in database 
  */
  DeleteDataSource(id: number): Observable<DataSource> {
    return this.http.delete<DataSource>(this.dataSourceUrl + "/" + id);
  }

  /**
   * delete orderBy in database 
   */
  DeleteOrderBy(id: number): Observable<OrderBy> {
    return this.http.delete<OrderBy>(this.dataSourceUrl + "/OrderBy/" + id);
  }

  /**
   * save orderBy in database 
   */
  SaveOrderBy(orderBy: OrderBy): Observable<OrderBy> {
    return this.http.post<OrderBy>(this.dataSourceUrl + "/OrderBy", orderBy);
  }
}

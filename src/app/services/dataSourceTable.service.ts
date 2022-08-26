import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Join } from '../models/join';
import { DataSourceTable } from '../models/dataSourceTable';




@Injectable({ providedIn: 'root' })
export class DataSourceTableService {

  readonly dataSourceTableUrl = environment.API_URL + 'api/DataSourceTables';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * GET all type join  from the server
   */
  getJoins(): Observable<Join[]> {
    return this.http.get<Join[]>(this.dataSourceTableUrl + '/Join');
  }

  /**
   * GET dataSource tables  from the server
   * @param id 
   * @returns 
   */
  getDataSourceTables(id: number): Observable<DataSourceTable[]> {
    return this.http.get<DataSourceTable[]>(this.dataSourceTableUrl + "/DataSource/" + id);
  }

  /**
   * GET main dataSource tables of a query  from the server
   * @param id 
   * @returns 
   */
  getMainDataSourceTable(id: number): Observable<DataSourceTable> {
    return this.http.get<DataSourceTable>(this.dataSourceTableUrl + "/MainDataSourceTable/" + id);
  }

  /**
   * update dataSource in database 
   * @param dataSourceTable 
   * @returns 
   */
  UpdateDataSourceTable(dataSourceTable: DataSourceTable): Observable<any> {
    return this.http.put<DataSourceTable>(this.dataSourceTableUrl + "/" + dataSourceTable.id, dataSourceTable);
  }

  /**
   * delete dataSourceTable in database
   * @param id 
   * @returns 
   */
  DeleteDataSourceTable(id: number): Observable<DataSourceTable> {
    return this.http.delete<DataSourceTable>(this.dataSourceTableUrl + "/" + id);
  }


  /**
   * save dataSourceTable  in database 
   * @param dataSourceTable 
   * @returns 
   */
  SaveDataSourceTable(dataSourceTable: DataSourceTable): Observable<DataSourceTable> {
    return this.http.post<DataSourceTable>(this.dataSourceTableUrl, dataSourceTable);
  }
}

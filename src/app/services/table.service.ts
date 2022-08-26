import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from 'src/app/models/table'
import { TableFields } from '../models/tableField';



@Injectable({ providedIn: 'root' })
export class TableService {

  readonly tablesUrl = environment.API_URL + 'api/Tables';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * GET tables  from the server
   */
  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.tablesUrl);
  }

  /**
   * get fields of a table 
   * @param id 
   * @returns 
   */
  getTableFields(id: number): Observable<TableFields[]> {
    return this.http.get<TableFields[]>(this.tablesUrl + '/TableField/' + id);
  }

  /**
   * get primary fields of a table 
   * @param id 
   * @returns 
   */
  getTablePrimaryFields(id: number): Observable<TableFields> {
    return this.http.get<TableFields>(this.tablesUrl + '/TableField/Primary/' + id);
  }

  /**
   * get foreign key fields of a table 
   * @param id 
   * @returns 
   */
  getTableForeignFields(id: number): Observable<TableFields[]> {
    return this.http.get<TableFields[]>(this.tablesUrl + '/TableField/Foreign/' + id);
  }
}

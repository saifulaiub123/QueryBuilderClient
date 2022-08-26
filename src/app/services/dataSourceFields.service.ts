import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ffunction } from '../models/function';
import { DataSourceField } from '../models/dataSourceField';




@Injectable({ providedIn: 'root' })
export class DataSourceFieldService {

  readonly dataSourceFieldUrl = environment.API_URL + 'api/DataSourceFields';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * GET functions from the server
   */
  getFunctions(): Observable<Ffunction[]> {
    return this.http.get<Ffunction[]>(this.dataSourceFieldUrl + '/Function');
  }

  /**
   * save data source fields in database 
   * @param dataSourceField 
   * @returns 
   */
  SaveDataSourceField(dataSourceField: DataSourceField): Observable<DataSourceField> {
    return this.http.post<DataSourceField>(this.dataSourceFieldUrl, dataSourceField);
  }

  /**
   * update dataSourceField in database 
   * @param dataSourceField 
   * @returns 
   */
  UpdateDataSourceField(dataSourceField: DataSourceField): Observable<any> {
    return this.http.put<DataSourceField>(this.dataSourceFieldUrl + "/" + dataSourceField.id, dataSourceField);
  }
}

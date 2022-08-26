import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classification } from '../models/classification';
import { DataSource } from '../models/dataSource';
import { OrderBy } from '../models/orderBy';
import { DataSourceTable } from '../models/dataSourceTable';
import { DynamicQueryModel } from '../models/dynamicQueryModel';





@Injectable({ providedIn: 'root' })
export class DynamicLinqService {

  readonly dataSourceUrl = environment.API_URL + 'api/DynamicLinq';  // URL to web api

  constructor(private http: HttpClient) { }

  getDynamicLinqData(model : DynamicQueryModel): Observable<any[]> {
    return this.http.post<any[]>(this.dataSourceUrl + "/GetData", model);
  }

}

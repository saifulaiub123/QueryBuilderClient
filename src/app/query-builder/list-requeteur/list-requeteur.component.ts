import { Component, OnInit } from '@angular/core';
import { DataSource } from 'src/app/models/dataSource';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceTableService } from 'src/app/services/dataSourceTable.service';
import { DataSourceModel } from 'src/app/models/dataSourceModel';
import { ConfirmationService, Message } from 'primeng/api';


@Component({
  selector: 'app-list-requeteur',
  templateUrl: './list-requeteur.component.html',
  styleUrls: ['./list-requeteur.component.scss'],
})
export class ListRequeteurComponent implements OnInit {
  rowsNumber = 10;
  rowsPerPage = [5, 10, 20];
  dataSources: DataSource[];
  dataSourcesModel: DataSourceModel[] = [];
  msgs: Message[] = [];
  position: string;

  constructor(private dataSourceService: DataSourceService
    , private router: Router
    , private _activatedRoute: ActivatedRoute
    , private dataSourceTableService: DataSourceTableService
    , private confirmationService: ConfirmationService

  ) { }

  ngOnInit(): void {
    this.getAllDataSources();
  }
  
  /**
   * navigate to interface create query
   * @param id 
   */
  btnAddClick(id) {
    this.router.navigate(['edition', id], { relativeTo: this._activatedRoute });
  };

  /**
   * navigate to interface update query
   * @param id 
   */
  btnUpdateClick(id) {
    this.router.navigate(['edition', id], { relativeTo: this._activatedRoute });
  };

  /**
   * show result directly of a query 
   * @param id 
   */
  showResult(idDataSource,id){
    this.router.navigate(['edition',idDataSource,id ], { relativeTo: this._activatedRoute });
  }

  /**
   * delete query
   * @param id 
   */
  async btnDeleteClick(id) {
    this.position = 'topright';
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
        await this.dataSourceService.DeleteDataSource(id).toPromise();
        this.dataSourcesModel = [];
        await this.getAllDataSources();
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'warn', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  };

  /**
   * get all queries 
   */
  async getAllDataSources() {
    this.dataSources = await this.dataSourceService.getAllDataSource().toPromise();
    var dataSM: DataSourceModel[] = [];
    for (const dataSource of this.dataSources) {
      var dataSourceModel = new DataSourceModel()
      dataSourceModel.dataSource = dataSource;
      dataSourceModel.mainDataSTable = await this.dataSourceTableService.getMainDataSourceTable(dataSource.id)
        .toPromise();
      dataSM.push(dataSourceModel);
    }
    this.dataSourcesModel = dataSM;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, SelectItem } from 'primeng/api';
import { TableFields } from 'src/app/models/tableField';
import { Table } from 'src/app/models/table';
import { TableService } from 'src/app/services/table.service';
import { Ffunction } from 'src/app/models/function';
import { Ooperator } from 'src/app/models/operator';
import { ExpressionTermService } from 'src/app/services/expressionTerm.service';
import { DataSourceTableService } from 'src/app/services/dataSourceTable.service';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { Join } from 'src/app/models/join';
import { PtreeTable } from 'src/app/models/ptreeTable';
import 'jspdf-autotable'
import jsPDF from 'jspdf'
import autoTable, { Styles } from 'jspdf-autotable'
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
import { TreeNode } from 'primeng/api';
import { PtreeChildren } from 'src/app/models/ptreeChildren';
import { Classification } from 'src/app/models/classification';
import { DataSourceFieldService } from 'src/app/services/dataSourceFields.service';
import { DataSourceField } from 'src/app/models/dataSourceField';
import { DatePipe } from '@angular/common';
import { OrderBy } from 'src/app/models/orderBy';
import { JoinModel } from 'src/app/models/joinModel';
import { OrderByModel } from 'src/app/models/orderByModel';
import { DataSource } from 'src/app/models/dataSource';
import { ExpressionTerm } from 'src/app/models/expressionTerm';
import { WhereModel } from 'src/app/models/whereModel';
import { HavingModel } from 'src/app/models/havingModel';
import { JoinExpressionTermModel } from 'src/app/models/expressionTermModel';
import { GroupByModel } from 'src/app/models/groupByModel';
import { DataSourceTable } from 'src/app/models/dataSourceTable';
import { DynamicDialogRef } from 'primeng';
import { Constants } from 'src/app/common/global-constants'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ColumnPdfWidth } from 'src/app/models/columnPdfWidth';
import { DynamicQueryModel } from 'src/app/models/dynamicQueryModel';
import { DynamicLinqService } from 'src/app/services/dynamicLinqService';
import { DynamicCondition } from 'src/app/models/dynamicCondition';
import { JoinTableModel } from 'src/app/models/joinTableModel';
@Component({
  selector: 'app-dynamic-builder',
  templateUrl: './dynamic-builder.component.html',
  styleUrls: ['./dynamic-builder.component.scss']
})
export class DynamicBuilderComponent implements OnInit {


  tableList: any;
  selectedParentTable:any = null;

  tableColumnList : any;
  parentTableColumnList: any;


  selectedJoinTable : any;
  joinTableReferenceColumnList: any;
  selectedJoinTableColumns : any;
  selectedJoinParentTable:any;
  selectedJoinParentTableReferenceColumn: any;
  joinParentTableColumnList: any;
  joinTableColumnToShowList : any;


  joinTableColumnsToShow: any;

  selectedConditionTable:any = null;
  selectedConditionColumn:any;

  conditionTableColumnList:any;
  conditionTypeList:any;
  selectedConditonType:any;
  condtionValue:any;
  selectedValueType:any;
  valueTypeList:any;
  selectedParentTableColumns:any

  isParentTableSelected : boolean = false;

  dynamicData: any[] = [];

  isSelectedChildTable : boolean = false;
  childTableName : string;
  childTableColumnList: any;
  selectedChildTableColumnList: any;




















  dataRequest: any;
  column: Array<any> = [];
  ids: Array<Number> = [];

  // global constants
  constants: Constants = new Constants();
  msgs: Message;
  position: string;
  jsPDF: any
  visibleSidebar1 = false;

  // dataSource of our query
  dataSource: DataSource = new DataSource();

  // add or not add filter to query
  where = false;
  having = false;
  joinn = false;
  orderB = false;
  groupB = false;
  ptree = false;
  orderWhere: number;
  orderHaving: number;
  orderDataSourceTable: number;
  idd: number;

  // open or close brockets in where and having filter
  openBrock = true;
  closeBrock = false;
  openBrockHaving = true;
  closeBrockHaving = false;
  nombreClose = 0;
  nombreOpen = 0;
  selectedPtreeChild = new PtreeChildren();
  table: Table;

  // main table
  selectedTable: Table;
  selectedMainTable: Table = new Table();
  mainTableSelected = false;
  mainPtreeTable: PtreeTable = new PtreeTable();

  // joined table
  joinedTable: Table;
  joinedTables: Table[];
  temporaryTable: Table;

  // all tables
  aTables: Table[] = [];
  tables: Table[] = [];

  // tables selected by user
  filterTables: Table[] = [];
  selectedTab: any;
  tableField: TableFields;

  // table principale field
  joinTPrincipaleChamp: TableFields;

  // main table fields
  principaleTableFields: TableFields[];

  // joined table fields
  joinedTableFields: TableFields[] = [];

  function: Ffunction;

  // table of function
  functions: Ffunction[] = [];
  functionsModel: Ffunction[] = [];
  selectedFunction: Ffunction;

  // having expression term
  havingExpressionTerm: ExpressionTerm = new ExpressionTerm();
  havingSqlExpressionTerm: ExpressionTerm = new ExpressionTerm();
  buttonHavingEnabled = true;
  havingFunction: Ffunction = new Ffunction();

  // where expression term
  whereExpressionTerm: ExpressionTerm = new ExpressionTerm();
  expressionTerm: ExpressionTerm = new ExpressionTerm();

  // table of expression term
  expressionTerms: ExpressionTerm[] = [];
  expressionHavingTerms: ExpressionTerm[] = [];

  // table of order by
  orderBy: OrderBy;
  orderBys: OrderBy[] = [];
  orderByFiled: OrderBy;

  // for binding multiple row of group by
  groupByModel: GroupByModel = new GroupByModel();
  groupByModels: GroupByModel[] = [this.groupByModel];
  dataSfieldForGB = new DataSourceField();
  groupByField: string;

  // table of operator
  operator: Ooperator;
  operators: Ooperator[] = [];

  // table of join
  join: Join;
  joins: Join[] = [];

  // table of classification
  classification: Classification;
  classifications: Classification[] = [];

  files: TreeNode[];

  // default filters "where "
  condition = 'Where';

  // help to save selected fields and display them in the table
  selectedItemFields: PtreeChildren[] = [];

  // to save selected fields and display them in the table
  tableSelectedFields: TableFields[] = [];

  // To save selected fields in select sql operation;
  dataSourceField: DataSourceField;
  dataSourceFields: DataSourceField[] = [];
  dataSourceTable: DataSourceTable = new DataSourceTable();
  dataSourceTables: DataSourceTable[] = [];
  dataSourceFieldsFunction: DataSourceField[] = [];
  dataSourceFieldsGroupBY: DataSourceField[] = [];

  // distinct filter
  distinctValue: boolean = false;

  // export to pdf
  addLogo = true;
  addDate = true;
  addPage = true;
  addTitle = true;
  changeWidth = false;
  numberRight = false;
  numberMiddle = false;
  numberLeft = true
  themeStriped = false;
  themeGrid = true;
  themePlain = false;
  pdfHorizental = false;
  pdfVertical = true;
  pdfTitle: string;
  pageNumberStyle: { label: string; value: string };
  pageNumberStyles: { label: string; value: string }[];
  columnPdfWidth: ColumnPdfWidth=new ColumnPdfWidth();
  columnPdfWidths: ColumnPdfWidth[]=[];
  dateFormat: { label: string; value: string };
  dateFormats: { label: string; value: string }[];
  pagePosition: { label: string; value: string };
  datePosition: { label: string; value: string };
  pagePositions: { label: string; value: string }[];
  datePositions: { label: string; value: string }[];

  // export to csv
  csvSeparator: string;
  addCsvHeader = true;
  singleQuoteCsv = false;
  doubleQuoteCsv = true
  addCsvShowTitle = false;
  csvTitle: string;

  // export to excel
  addDateExcel = true;
  addLogoExcel = true;
  addTitleExcel = true;
  dateFormatExcel: { label: string; value: string };
  excelTitle: string;
  headerColorExcel: { label: string; value: string };
  headerColorExcels: { label: string; value: string }[];

  // type side bar
  pdfSideBar = false;
  excelSideBar = false;
  csvSideBar = false;

  // To dissplay filters depending on user choice
  checkedWhere = true;
  checkedHaving = false;
  checkedGroup = false;
  checkedOrder = false;
  /*
  whereConditionValue: String = "";
  whereConditionValues: String[] = [this.whereConditionValue];
  */

  /**
   * those boolean vars for display different part of the query builder
   */
  displayIdentification = true;
  displayJointures = false;
  displayChamps = false;
  displayFilters = false;
  displayResultat = false;

  pageIndex = 1;
  rowsNumber = 20;
  rowsPerPage = [5, 10, 20];
  isFilterActive = true;
  id: string;
  msags: Message[] = [];

  checked2 = true;
  indexNumber = 0;
  taxsource = '';
  taxAbbreviation = '';
  abbCondition = '';

  // to create binding in "having section "
  havingModel: HavingModel = new HavingModel();
  havingModels: HavingModel[] = [this.havingModel];

  // to create binding in "where section "
  whereModel: WhereModel = new WhereModel();
  whereModels: WhereModel[] = [this.whereModel];

  // jointure
  joinExpressionTerm: ExpressionTerm = new ExpressionTerm();
  joinExpressionTerms: ExpressionTerm[] = [];
  joinExpressionTermModel: JoinExpressionTermModel = new JoinExpressionTermModel();

  // to create binding in "jointure section "
  joinModel: JoinModel = new JoinModel();
  joinModels: JoinModel[] = [this.joinModel];

  // to create binding in "OrderBy section "
  orderByModel: OrderByModel = new OrderByModel();
  orderByModels: OrderByModel[] = [this.orderByModel];

  directions: { label: string; value: string }[];
  direction: string = '';
  ecrans: { label: string; value: string }[];
  filterss: { label: string; value: string }[];
  actives: SelectItem[];
  EtOu: { label: string; value: string }[];

  /**
   * to display tree of selected tables and fields
   */
  designation: any[];
  ptreeTable: PtreeTable;
  ptreeTables: PtreeTable[] = [];
  childrenTable: PtreeChildren;
  childrenTables: PtreeChildren[] = [];

  champ: any[];
  type: { label: string; value: string }[];
  ref: DynamicDialogRef;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public tableService: TableService,
    private http: HttpClient,
    private expressionTermService: ExpressionTermService,
    private dataSourceTableService: DataSourceTableService,
    private dataSourceFieldService: DataSourceFieldService,
    private dataSourceService: DataSourceService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private dynamicLinqService: DynamicLinqService,
    // private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  //get all tables
  async LoadALL(): Promise<Table[]> {
    return (this.tables = await this.tableService.getTables().toPromise());
  }


  GetDataRequest(sql: string) {
    this.dataSourceService.getDataRequest(sql).subscribe((data: any) => {
      this.dataRequest = data;
      console.log(this.dataRequest);
      this.column = [];
      for (const key in this.dataRequest[0]) {
        if (!this.column.includes(key)) {
          this.column.push(key);
        }
      }
    });
  }



  async GetDataSource(id: number): Promise<void> {
    this.dataSource = await this.dataSourceService.getDataSource(id).toPromise();
    if (this.dataSource.distinct == true) {
      this.distinctValue = true;
    }
  }


  async GetTableFields(id: number): Promise<TableFields[]> {
    return (this.principaleTableFields = await this.tableService.getTableFields(id).toPromise());
  }


  async GetTablePrimaryFields(id: number): Promise<TableFields> {
    return (await this.tableService.getTablePrimaryFields(id).toPromise());
  }

  /**
   *
   * @param id to get foreign fields of each table
   * @returns
   */
  async GetTableForeignFields(id: number): Promise<TableFields[]> {
    return (this.principaleTableFields = await this.tableService.getTableForeignFields(id).toPromise());
  }



  /**
   * export result of the query to Excel files
   */
  exportExcel() {
    this.csvSideBar = false;
    this.excelSideBar = true;
    this.pdfSideBar = false;
    this.visibleSidebar1 = true;
    this.excelTitle = this.dataSource.designation;
    this.headerColorExcel = { label: 'Blue', value: '0000FF' };
    this.dateFormatExcel = { label: 'dd/mm/yyyy', value: 'dd/mm' };
  }

  /**
   * export result of the query to CSV file
   */
  exportCSV() {
    this.pdfSideBar = false;
    this.excelSideBar = false;
    this.csvSideBar = true;
    this.visibleSidebar1 = true;
    this.csvTitle = this.dataSource.designation;
    this.csvSeparator = ',';
  }


  /**
   * export result of the query to PDF file
   *
   */
  exportPdf() {
    this.excelSideBar = false;
    this.csvSideBar = false;
    this.pdfSideBar = true;
    this.visibleSidebar1 = true;
    this.pdfTitle = "Title";
    this.pageNumberStyle = { label: 'page x of y', value: 'of' };
    this.dateFormat = { label: 'dd/mm/yyyy', value: 'dd/mm' };
    this.datePosition = { label: 'Bottom-Right', value: 'bottomright' };
    this.pagePosition = { label: 'Bottom-Left', value: 'left' };
    this.columnPdfWidths=[];
    for(const [i,value] of this.column.entries()){
     var columnPdfWidth=new ColumnPdfWidth();
      columnPdfWidth.label=value;
      columnPdfWidth.indice=i;
      this.columnPdfWidths.push(columnPdfWidth);
    }
  }



  /**
   * change display order in exported file
   */
  displayToVertical() {
    this.pdfHorizental = true;
    this.pdfVertical = false;
  }

  /**
   * change display order in exported file
   */
  displayToHorizental() {
    this.pdfHorizental = false;
    this.pdfVertical = true;
  }

  /**
   * change number page position
   */
  numberToRight() {
    this.numberRight = true;
    this.numberMiddle = false;
    this.numberLeft = false;
  }

  /**
    * change number page position
    */
  numberToMiddle() {
    this.numberRight = false;
    this.numberMiddle = true;
    this.numberLeft = false;
  }
  /**
    * change number page position
    */
  numberToLeft() {
    this.numberRight = false;
    this.numberMiddle = false;
    this.numberLeft = true;
  }

  /**
  * change separator type in csv file
  */
  singleQuote() {
    this.singleQuoteCsv = true;
    this.doubleQuoteCsv = false;
  }

  /**
  * change separator type in csv file
  */
  doubleQuote() {
    this.singleQuoteCsv = false;
    this.doubleQuoteCsv = true;
  }

  /**
  * change theme of exported file
  */
  themeToBlue() {
    this.themeGrid = false;
    this.themeStriped = true;
    this.themePlain = false;
  }
  /**
   * change theme of exported file
   */
  themeToPlain() {
    this.themePlain = true;
    this.themeGrid = false;
    this.themeStriped = false;
  }

  /**
   * change theme of exported file
   */
  themeToGreen() {
    this.themeGrid = true;
    this.themeStriped = false;
    this.themePlain = false;

  }

  /**
   * export data to csv file
   */
  exportDataCsv() {
    var title = this.csvTitle;
    var separator = this.csvSeparator;
    if (this.doubleQuoteCsv == true) {
      var quote = "\""
    } else if (this.singleQuoteCsv == true) {
      quote = "\'"
    }

    if (this.addCsvShowTitle == true) {
      var showTitle = true;
    }
    else {
      showTitle = false
    }

    if (this.addCsvHeader == true) {
      var useKeyHeader = true;
    } else {
      useKeyHeader = false;
    }

    const options = {
      fieldSeparator: separator,
      quoteStrings: quote,
      decimalSeparator: ',',
      showLabels: false,
      showTitle: showTitle,
      title: title,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: useKeyHeader,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.dynamicData);
  }

  /**
   * export data to excel file
   */
  exportDataExcel() {
    import("xlsx").then(xlsx => {
      var temp = [];
      var cols = [];
      var title = this.excelTitle;
      for (var value of this.column) {
        cols.push({ header: value, dataKey: value });
      }
      const header = this.column;
      const data = this.dynamicData;
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet();
      // Add new row
      if (this.addTitleExcel == true) {
        let titleRow = worksheet.addRow([title]);
        // Set font, size and style in title row.
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
      }
      var color = this.headerColorExcel.value;
      // Blank Row
      worksheet.addRow([]);

      //Add row with current date
      if (this.addDateExcel == true) {

        if (this.dateFormatExcel.value == 'dd/mm') {
          var subTitleRow = worksheet.addRow([this.datePipe.transform(new Date(), 'dd/MM/yyyy')]);
        } else if (this.dateFormatExcel.value == 'mm/dd') {
          subTitleRow = worksheet.addRow([this.datePipe.transform(new Date(), 'MM/dd/yyyy')]);
        } else if (this.dateFormatExcel.value == 'dd-mm') {
          subTitleRow = worksheet.addRow([this.datePipe.transform(new Date(), 'dd-MM-yyyy')]);
        } else {
          subTitleRow = worksheet.addRow([this.datePipe.transform(new Date(), 'MM-dd-yyyy')]);
        }
      }

      var img = new Image;
      img.src = "assets/logo.jpg";
      img.crossOrigin = "";
      const logoBase64 = "data:image/jpeg;base64,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"
      let logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      if (this.addLogoExcel == true) {
        worksheet.addImage(logo, 'E1:F3');
      }

      //Add Header Row
      let headerRow = worksheet.addRow(header);

      // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color },
          bgColor: { argb: color }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });


      // Add Data and Conditional Formatting
      data.forEach(d => {
        for (const head of header) {

          //console.log(head);
          temp.push(d[head]);
          //console.log(item[head]);
        }
        let row = worksheet.addRow(temp);
        temp = [];
      }
      );

      worksheet.columns.forEach(function (column, i) {
        if (i !== 0) {
          var maxLength = 0;
          column["eachCell"]({ includeEmpty: false }, function (cell) {
            var columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength;
        }
      });
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'myExcelTable.xlsx');
      });
    });
  }

  /**
   * export result of query to pdf
   */
  exportData() {
    var title = this.pdfTitle;
    var img = new Image;
    var themee;
    var cols = [];

    for (var value of this.column) {
      cols.push({ header: value, dataKey: value });
    }
    var doc;
    if (this.pdfHorizental == true) {
      doc = new jsPDF('l', 'pt');
    } else if (this.pdfVertical == true) {
      doc = new jsPDF('p', 'pt');
    }

    doc.setFont("times");
    //doc.setTextColor(0,0,255);
    img.src = "assets/logo.jpg";
    img.crossOrigin = "";
    if (this.addTitle == true) {
      doc.text(title, doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });
    }
    if (this.dateFormat.value == 'dd/mm') {
      var newdat = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    } else if (this.dateFormat.value == 'mm/dd') {
      newdat = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    } else if (this.dateFormat.value == 'dd-mm') {
      newdat = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    } else {
      newdat = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    }
    console.log(this.dataRequest);
    if (this.themeStriped == true) {
      themee = 'striped'
    } else if (this.themePlain == true) {
      themee = 'plain'
    }
    else {
      themee = 'grid'
    }
    var columnStyles:any=[];
    for(const [i,value] of this.columnPdfWidths.entries()){

     if(value.value!=undefined){
      columnStyles.push( {cellWidth:value.value} );
      console.log(value.value);
     }else
     {
      columnStyles.push( {cellWidth:'auto'} )
     }
    }

    //doc.text(newdat, doc.internal.pageSize.getWidth() - 100, doc.internal.pageSize.getHeight() - 20);
    autoTable(doc, {
      styles: {
        font: 'times',
        minCellWidth:40,
      },
      columnStyles: columnStyles,
      columns: cols,
      body: this.dynamicData,
      theme: themee,
      margin: { top: 55, bottom: 40, right: 20, left: 20 },

    });
    const pageCount = doc.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      // Go to page i
      if (this.addLogo == true) {
        doc.addImage(img, 'JPEG', 10, 3, 100, 40);
      }

      doc.setPage(i);
      doc.setLineWidth(1);
      //doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
      if (this.pageNumberStyle.value == 'x') {
        var page = i + ''
      } else if (this.pageNumberStyle.value == 'page') {
        page = 'page' + ' | ' + i
      } else if (this.pageNumberStyle.value == 'pg') {
        page = 'pg.' + i
      } else if (this.pageNumberStyle.value == 'of') {
        page = 'page ' + i + ' of ' + String(pageCount)
      } else {
        page = + i + ' / ' + String(pageCount)
      }

      //Print Page 1 of 4 for example
      if (this.addPage == true) {
        if (this.pagePosition.value == 'left') {
          doc.text(page, 12, doc.internal.pageSize.getHeight() - 15, null, null);
        } else if (this.pagePosition.value == 'middle') {
          doc.text(page, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, null, null);
        }
        /*
        if (this.numberRight == true) {
          doc.text(page, doc.internal.pageSize.getWidth() - 90, doc.internal.pageSize.getHeight() - 15, null, null);
          if (this.addDate == true) {
            doc.text(newdat, 12, doc.internal.pageSize.getHeight() - 15);
          }
        }*/
      }
      if (this.addDate == true) {
        if (this.datePosition.value == 'bottomright') {
          doc.text(newdat, doc.internal.pageSize.getWidth() - 90, doc.internal.pageSize.getHeight() - 15);
        } else if (this.datePosition.value == 'topright') {
          doc.text(newdat, doc.internal.pageSize.getWidth() - 90, 30);
        }
      }
    }
    doc.save('myPdfTable.pdf');
  }












  async ngOnInit(): Promise<void> {
    var idShow: number;
    this.activatedRoute.params.subscribe((params) => {
      this.idd = params['id'];
      idShow = params['id1'];
    });

    this.joinedTables = [];
    this.orderByFiled = new OrderBy();
    this.principaleTableFields = [];

    if (idShow == -2) {
      this.displayIdentification = false;
      this.displayJointures = false;
      this.displayChamps = false;
      this.displayFilters = false;
      this.displayResultat = true;

    }

    /**
     * update query
     */
    if (this.idd != -1) {
      this.ptreeTables = [];
      this.selectedItemFields = [];

      this.ptree = true;

    }

    this.tableColumnList = [
      { name: "Id", id: "1" },
      { name: "Name" , id: "2" },
      { name: "IsActive" , id: "3" },
      { name: "Quantity" , id: "4" },
      { name: "SupplierId" , id: "5" }
    ];

    this.conditionTypeList = [
      { name: ">", id: "1" },
      { name: "<" , id: "2" },
      { name: "=" , id: "3" },
    ];

    this.valueTypeList = [
      { name: "int", id: "1" },
      { name: "string" , id: "2" },
    ]

    this.tableService.getTables().subscribe((data: any) => {
      this.tableList = data;
    });

  }

  onParentTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.parentTableColumnList = data;
      this.conditionTableColumnList = data;
      this.isParentTableSelected = true;
      this.selectedParentTableColumns = null;

      this.isSelectedChildTable = false;
      this.childTableColumnList = null;
      this.selectedChildTableColumnList = null;
    });
  }
  onParentParentTableColumnChange(event)
  {
    let val = event.itemValue;
    if (event.value.some((a) => a.id === val.id)) {

      this.tableService.getTableFieldsByTableName(val.name).subscribe((data: any) => {
        if(data.length > 0)
        {
          this.isSelectedChildTable = true;
          this.childTableColumnList = data;
          this.childTableName = val.name;
          //this.selectedParentTableColumns = [...this.selectedParentTableColumns];
        }
      });
  }
  else{
    if(val.name == this.childTableName)
      {
        this.isSelectedChildTable = false;
        this.childTableColumnList = null;
        this.childTableName = null;
        this.selectedChildTableColumnList = null;
      }
  }

  }
  onJoinTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.joinTableReferenceColumnList = data;
      this.joinTableColumnToShowList = data;
    });
  }
  onJoinParentTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.joinParentTableColumnList = data;
    });
  }


  onConditionTableChange(event)
  {
    let val = event.value;
    this.tableService.getTableFields(val.id).subscribe((data: any) => {
      this.conditionTableColumnList = data;
    });
  }





  /**
   * get all iformations about a query including fiters to dispay them for update
   * @param id
   */
  /*
  */

  /**
   * display where filter
   * @param e
   */
  changeToWhere(e) {
    const fChecked = e.checked;
    if (fChecked) {
      this.checkedWhere = true;
      this.checkedHaving = false;
      this.checkedGroup = false;
      this.checkedOrder = false;
    }
  }

  /**
   * display having filter
   * @param e
   */
  changeToHaving(e) {
    const fChecked = e.checked;
    if (fChecked) {
      this.checkedWhere = false;
      this.checkedHaving = true;
      this.checkedGroup = false;
      this.checkedOrder = false;
    }
  }

  changeToOrder(e) {
    const fChecked = e.checked;
    if (fChecked) {
      this.checkedWhere = false;
      this.checkedHaving = false;
      this.checkedGroup = false;
      this.checkedOrder = true;
    }
  }

  displayIdentificationClickHandler() {
    this.displayIdentification = true;
    this.displayJointures = false;
    this.displayChamps = false;
    this.displayFilters = false;
    this.displayResultat = false;
  }

  async displayJointuresClickHandler() {


    // if (this.joinedTables.length > 0) {
    //   this.displayIdentification = false;
    //   this.displayJointures = true;
    //   this.displayChamps = false;
    //   this.displayFilters = false;
    //   this.displayResultat = false;
    //   this.joinModel.tablePrincipale = this.selectedTable;
    //   this.joinModel.joinedTable = this.joinedTables[0];
    //   this.joinModel.tableField = await this.GetTableFields(this.selectedTable.id);
    //   this.joinModel.tableField.forEach(value => {
    //     if (value.designation == this.constants.primaryKey) {
    //       console.log(true);
    //       this.joinModel.champ1 = value;
    //     }
    //   });

    //   this.joinModel.tableField1 = await this.GetTableFields(this.joinedTables[0].id);
    //   this.joinModel.tableField1.forEach(value => {
    //     if (value.designation == this.constants.foreignKey) {
    //       console.log(true);
    //       this.joinModel.champ2 = value;

    //     }
    //   });
    //   this.operators.forEach(operator => {
    //     if (operator.designation == this.constants.equal) {
    //       this.joinModel.operator2 = operator;
    //     }
    //   });
    //   this.joins.forEach(join => {
    //     if (join.designation == this.constants.innerJoin) {
    //       this.joinModel.type = join;
    //     }
    //   })
    // }
    // else {
    //   //no joined table selected
    //   if (this.displayChamps != true) {
    //     this.displayIdentification = false;
    //     this.displayJointures = false;
    //     this.displayChamps = true;
    //     this.displayFilters = false;
    //     this.displayResultat = false;
    //   } else {
    //     this.displayIdentification = true;
    //     this.displayJointures = false;
    //     this.displayChamps = false;
    //     this.displayFilters = false;
    //     this.displayResultat = false;

    //   }


    // }
    this.displayJointures = true;
    this.displayIdentification = false;
    this.displayResultat = false;

    if(this.isParentTableSelected)
    {
      this.selectedConditionTable = this.selectedParentTable;
    }


    /**
     * test if tree of selected tables and fields created or create one
     */
    if (this.ptree == false) {
      this.ptree = true;
      this.ptreeTables = [];
      this.selectedItemFields = [];
      await this.createPtreTable();
      // await this.enableSelectedFieldCheckBox();
    }
  }


  changeTableAssociated() {
    this.ptree = false;
  }


  async changeTablePrincipale(tab) {
    this.ptree = false;
    this.aTables = [];
    this.joinedTables = [];
    /*
    this.whereModel=new WhereModel();
    this.whereModels=[this.whereModel];
    this.havingModel= new HavingModel();
    this.havingModels=[this.havingModel];
    this.orderByModel= new OrderByModel();
    this.orderByModels=[this.orderByModel];
    */

    /**
     * delete selected main table from list of joined tables
     */
    for (const tabl of this.tables) {
      if (tab.id != tabl.id) {
        this.aTables.push(tabl);
      }
    }
    //this.tables=table;
  }


  async createPtreTable() {
    /**
     *  firt we create ptreeTable for main table
     */
    const fields = await this.GetTableFields(this.selectedTable.id);
    this.principaleTableFields = fields;
    //new ptreeTable based on selected parincipale table
    this.ptreeTable = new PtreeTable();
    this.ptreeTable.label = this.selectedTable.name;
    this.ptreeTable.data = this.selectedTable;
    this.ptreeTable.expandedIcon = 'pi pi-folder-open';
    this.ptreeTable.collapsedIcon = 'pi pi-folder';
    this.ptreeTable.children = [];
    //make the childrens of the ptreetable in the "availaible field " from fields of each selected table
    for (const value of fields) {
      var dataSfields = new DataSourceField();
      dataSfields.tableField = value;
      this.childrenTable = new PtreeChildren();
      this.childrenTable.label = value.name;
      this.childrenTable.data = dataSfields;
      this.childrenTable.expandedIcon = 'pi pi-folder-open';
      this.childrenTable.collapsedIcon = 'pi pi-folder';
      await this.ptreeTable.children.push(this.childrenTable);
      //this.selectedItemFields.push(this.childrenTable);
      //this.childrenTable.data.alias="grtjk";
    }

    this.childrenTable.children = [];
    this.dataSourceTables = [];
    this.filterTables = [];
    this.ptreeTables = [];
    const filtTables: Table[] = []
    filtTables.push(this.selectedTable);

    /**
     * save main table as dataSourceTable
     */
    this.dataSourceTable.mainEntity = true;
    this.dataSourceTable.table = this.selectedTable;
    this.dataSourceTables.push(this.dataSourceTable);

    /**
     * then create ptreetable for joined tables
     */
    for (const value of this.joinedTables) {

      /**
       * save joinedTables AS dataSourceTables
       */
      /*
      dataStable = new DataSourceTable();
      dataStable.mainEntity = false;
      dataStable.table = value;
      this.dataSourceTables.push((dataStable));
      */
      let ptreeTable = new PtreeTable();
      ptreeTable.label = value.name;
      ptreeTable.data = value;
      ptreeTable.expandedIcon = 'pi pi-folder-open';
      ptreeTable.collapsedIcon = 'pi pi-folder';
      ptreeTable.children = [];
      const fields = await this.GetTableFields(value.id);
      for (const value1 of fields) {
        let dataSfield = new DataSourceField();
        dataSfield.tableField = value1;
        let childrenTable = new PtreeChildren();
        childrenTable.label = value1.name;
        childrenTable.data = dataSfield;
        childrenTable.expandedIcon = 'pi pi-folder-open';
        childrenTable.collapsedIcon = 'pi pi-folder';
        ptreeTable.children.push(childrenTable);
        //this.selectedItemFields.push(childrenTable);
      }
      await this.ptreeTables.push(ptreeTable);
      filtTables.push(value);
    }
    await this.ptreeTables.push(this.ptreeTable);

    /**
     * to display ptreeTable AS treeNode
     */
    this.files = this.ptreeTables;
    this.filterTables = filtTables;
  }


  async enableSelectedFieldCheckBox() {
    if (this.idd != -1 && this.idd != 0) {
      //this.selectedItemFields=[];
      this.ptreeTables.forEach((value) => {
        value.children.forEach((value1) => {
          this.dataSource.dataSourceFields.forEach((v) => {
            if (v.tableField.id == value1.data.tableField.id) {
              //check if we will turn on having filter depending on group by filter
              if (v.groupBy == true) {
                this.buttonHavingEnabled = false;
              }
              this.selectedItemFields.push(value1);
              value1.data = v;
            } else console.log('false');
          });
        });
      });
    }
  }


  async displayChampsClickHandler() {
    this.displayIdentification = false;
    this.displayJointures = false;
    this.displayChamps = true;
    this.displayFilters = false;
    this.displayResultat = false;
    if (this.ptree == false) {
      this.ptree = true;
      this.selectedItemFields = [];
      this.ptreeTables = [];
      await this.createPtreTable();
      // await this.enableSelectedFieldCheckBox();
    }
  }


  async getSelectedDataSourceField() {
    this.dataSourceFields = [];
    var order = 1;
    for (const dataSfield of this.selectedItemFields) {
      dataSfield.data.order = order;
      this.dataSourceFields.push(dataSfield.data);
      order += 1;
    }
  }

  displayFiltersClickHandler() {
    this.displayIdentification = false;
    this.displayJointures = false;
    this.displayChamps = false;
    this.displayFilters = true;
    this.displayResultat = false;
  }


  // async saveAllDStable(): Promise<void> {
  //   for (const dataSourceTable of this.dataSourceTables) {
  //     dataSourceTable.dataSource = this.dataSource;
  //     //this.dataSourceTable = await this.saveDataSourceTable(dataSourceTable);
  //     if (dataSourceTable.id == undefined) {
  //       this.dataSourceTable = await this.saveDataSourceTable(dataSourceTable);
  //     } else {
  //       await this.dataSourceTableService.UpdateDataSourceTable(dataSourceTable).toPromise();
  //     }
  //   }
  // }

  async displayResultatClickHandler() {
    this.displayResultat = true;
    this.displayJointures = false;
    this.displayIdentification = false;


    let outputColumns=[];
    let childOutputColumns = [];
    for(let item of this.selectedParentTableColumns){
      if(!this.tableList.some(obj => obj.name === item.name))
          outputColumns.push(item.name);
    }

    for(let item of this.selectedChildTableColumnList){
      if(!this.tableList.some(obj => obj.name === item.name))
          childOutputColumns.push(item.name);
    }

    let dq = new DynamicQueryModel();

    let joinTableList : JoinTableModel[] = [];
    let joinTable = new JoinTableModel();


    let dqcArr : DynamicCondition[] = [];
    let dqc = new DynamicCondition();

    joinTable.tableName = this.childTableName;
    joinTable.columns = childOutputColumns;
    joinTable.parentTableName = this.selectedParentTable.name;
    joinTable.parentColumnOn = this.childTableName;
    joinTable.currentColumnOn = "Id";

    joinTableList.push(joinTable);


    dqc.conditionTable = this.selectedConditionTable.name;
    dqc.conditionColumn = this.selectedConditionColumn.name;
    dqc.condition = this.selectedConditonType.name;
    dqc.value = this.condtionValue;
    //dqc.valueType = this.selectedValueType.name;

    dqcArr.push(dqc);

    dq.tableName = this.selectedParentTable.name;
    dq.columns = outputColumns;
    dq.joinTables = joinTableList;
    dq.whereConditions = dqcArr;


    this.dynamicLinqService.getDynamicLinqData(dq).subscribe((data: any) => {
      this.dynamicData = data.data;

      this.column = [];
      for (const key in this.dynamicData[0]) {
        if (!this.column.includes(key)) {
          this.column.push(key);
        }
      }
    });





    // if (this.selectedItemFields.length == 0) {
    //   this.displayIdentification = false;
    //   this.displayJointures = false;
    //   this.displayChamps = true;
    //   this.displayFilters = false;
    //   this.displayResultat = false;
    //   this.msags = [{ severity: 'warn', summary: 'Note:', detail: 'You have to select fields!' }];
    // } else if ((Object.keys(this.joinModel).length != 2) && this.joinedTables.length == 0 && this.joinn == false) {
    //   this.displayIdentification = false;
    //   this.displayJointures = true;
    //   this.displayChamps = false;
    //   this.displayFilters = false;
    //   this.displayResultat = false;
    //   this.msags = [{ severity: 'warn', summary: 'Note:', detail: 'No joined table is selected to add join filter !' }];

    // } else if (this.joinedTables.length != 0 && (Object.keys(this.joinModel).length == 2) && this.joinn == false) {
    //   this.displayIdentification = false;
    //   this.displayJointures = true;
    //   this.displayChamps = false;
    //   this.displayFilters = false;
    //   this.displayResultat = false;
    //   this.msags = [{ severity: 'warn', summary: 'Note:', detail: 'Join table selected you have to add join filter !' }];
    // }
    // else {
    //   this.displayIdentification = false;
    //   this.displayJointures = false;
    //   this.displayChamps = false;
    //   this.displayFilters = false;
    //   this.displayResultat = true;

    //   /*
    //   if (this.idd != -1) {
    //     await this.dataSourceService.DeleteDataSource(this.dataSource.id).toPromise();

    //   }
    //   */

    //   /**
    //    * get selected fields in the query
    //    */
    //   await this.getSelectedDataSourceField();

    //   /**
    //    * save selected fields with the datasource
    //    */
    //   this.dataSource.dataSourceFields = this.dataSourceFields;

    //   //this.dataSource = await this.saveDataSource(this.dataSource);

    //   /**
    //    * save or update dataSource depending on user choice
    //    */
    //   if (this.dataSource.id == undefined) {
    //     this.dataSource = await this.saveDataSource(this.dataSource);
    //   } else {
    //     await this.dataSourceService.UpdateDataSource(this.dataSource).toPromise();
    //   }

    //   /**
    //    * call function to save main table of query
    //    */
    //   await this.saveAllDStable();

    //   /**
    //    * build sql where expression if we have where in our query
    //    */
    //   if (Object.keys(this.whereModel).length != 7 || this.where == true) {
    //     this.whereExpressionTerm = await this.addWhere();
    //   }

    //   /**
    //    * build sql having expression if we have having conditions in our query
    //    */
    //   if (Object.keys(this.havingModel).length != 4 || this.having == true) {
    //     this.havingExpressionTerm = await this.addHaving();
    //   }

    //   /**
    //    * build sql order by expression if we have order by filters in the query
    //    */
    //   if (Object.keys(this.orderByModel).length != 1 || this.orderB == true) {
    //     await this.addOrderByCondition();
    //   }

    //   /**
    //    * build sql join expression  if we have join filter in our query
    //    */
    //   if (Object.keys(this.joinModel).length != 2 || this.joinn == true) {
    //     this.joinExpressionTerm = await this.addJoinExpressionTerm();
    //   }

    //   // create sql query with selected Fields
    //   var sqlQuery = await this.fieldsToSelect();
    //   console.log(sqlQuery);

    //   /**
    //    * To add join condition to sql query if it is  selected by user
    //    */
    //   if (this.joinExpressionTerms.length != 0) {
    //     sqlQuery = sqlQuery.slice(0, -1);
    //     sqlQuery = this.addJoinToSqlQuery(sqlQuery);
    //     this.joinExpressionTerms = [];
    //   }

    //   //To add "DISTINCT" to the sql query if it is selected by user
    //   if (this.distinctValue == true) {
    //     sqlQuery = this.addDistinctToSqlQuery(sqlQuery);
    //     this.dataSource.distinct = true;
    //   }

    //   //To add where filter to the sql query if it is selected by user
    //   if (!(Object.keys(this.whereExpressionTerm).length === 0)) {
    //     sqlQuery = await this.addWhereToSqlQuery(sqlQuery);
    //     this.whereExpressionTerm = new ExpressionTerm();
    //     //this.dataSource.whereCondition = this.whereExpressionTerm;
    //   }

    //   //To add groupe by  filter to the sql query if it is selected by user
    //   if (!(this.dataSourceFieldsGroupBY.length === 0)) {
    //     sqlQuery = sqlQuery.slice(0, -1);
    //     sqlQuery = this.addGroupByToSqlQuery(sqlQuery);
    //     this.dataSourceFieldsGroupBY = [];
    //   }

    //   //To add having filter to the sql query if it is selected by user
    //   if (!(Object.keys(this.havingSqlExpressionTerm).length === 0)) {
    //     sqlQuery = await this.addHavingToSqlQuery(sqlQuery);
    //     // this.dataSource.havingCondition = this.havingSqlExpressionTerm;
    //     this.havingSqlExpressionTerm = new ExpressionTerm();
    //   }

    //   // to know if order by is created by user and add it to sql query
    //   if (!(this.orderBys.length === 0)) {
    //     sqlQuery = sqlQuery.slice(0, -1);
    //     sqlQuery = this.addOrderByToSqlQuery(sqlQuery);
    //     this.orderBys = [];
    //   }

    //   // get data based on sql query created by user
    //   console.log(sqlQuery);
    //   this.GetDataRequest(sqlQuery);

    //   console.log(this.dataRequest);
    //   //add created query to the dataSource
    //   this.dataSource.sqlText = sqlQuery;

    //   //this.dataSource.DataSourceFields=this.dataSourceFields;
    //   if (this.dataSource.id == undefined) {
    //     this.dataSource = await this.saveDataSource(this.dataSource);
    //   } else {
    //     await this.dataSourceService.UpdateDataSource(this.dataSource).toPromise();
    //   }
    //   this.idd = 0;
    // }
  }

}

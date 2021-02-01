import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  ToastrService } from 'ngx-toastr';
import { AuthService } from "../../auth.service";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  response:any;

  //Pagination
  displayedColumns: string[] = [ 'name', 'email', 'role','request'];
  dataSource : MatTableDataSource<User>;
  ELEMENT_DATA: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.getUser();
  }

  //Get all users
  getUser(){
    this.ELEMENT_DATA.length = 0;
    this.auth.user_requested().subscribe(res=>{
      this.response = res;
      this.response.forEach( (e) => {
          this.ELEMENT_DATA.push({id: e.UserID, name: e.name, email: e.email, role: e.select_role})
      });
      this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  //Search User in Pagination
  searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(public dialog: MatDialog , private auth: AuthService) {}



}


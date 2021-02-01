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
  selector: 'user_request',
  styleUrls: ['./user_request.component.css'],
  templateUrl: './user_request.component.html',
})
export class UserRequestComponent implements OnInit {

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

  //Pop up to Approve a user
  approveUser(element:any): void {
    this.dialog.open(ApproveUserComponent,
    {width: '450px',data: {id : element.id, name: element.name,email: element.email,role:element.role}}
    ).afterClosed().subscribe(res=>{
      this.getUser();
    });
  }
  //Pop up to Reject a user
  rejectUser(element:any): void {
      this.dialog.open(RejectUserComponent,
      {width: '450px',data: {id : element.id, name: element.name, email: element.email, role:element.role}}
      ).afterClosed().subscribe(res=>{
        this.getUser();
      });
  }

}

//Approved user

@Component({
  selector: 'approve_user',
  styleUrls: ['approve_user.component.css'],
  templateUrl: 'approve_user.component.html',
})
export class ApproveUserComponent implements OnInit{

  response;

  constructor(  private auth:AuthService,
    private approveUser: MatDialogRef<ApproveUserComponent>,private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.approveUser.close();}

  ngOnInit(){  }

  ApproveUserSubmit(){
    this.auth.approve_user(this.data.id).subscribe(res=>{
      this.response = res;
      this.approveUser.close();
      this._toastr.success("Approved Successful");
    });

  }
}

//Reject user

@Component({
  selector: 'reject_user',
  styleUrls: ['reject_user.component.css'],
  templateUrl: 'reject_user.component.html',
})
export class RejectUserComponent implements OnInit{

  response;

  constructor(  private auth:AuthService,
    private rejectUser: MatDialogRef<RejectUserComponent>,private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.rejectUser.close();}

  ngOnInit(){}

  RejectUserSubmit(){
    this.auth.reject_user(this.data.id).subscribe(res=>{
      this.response = res;
      this.rejectUser.close();
      this._toastr.success("Rejected Successful");
    });

  }
}


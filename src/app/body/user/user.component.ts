import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, Validators , FormBuilder } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { AuthService } from "../../auth.service";


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface Role{
  role:string;
}

@Component({
  selector: 'user-table',
  styleUrls: ['./user.component.css'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

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
    this.auth.user_approved().subscribe(res=>{
      this.response = res;
      this.response.forEach( (e) => {
          this.ELEMENT_DATA.push({id: e.UserID, name: e.name, email: e.email, role: e.select_role})
      });
      this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  //Search user
  searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Pop up to Add a new user
  constructor(public dialog: MatDialog , private auth: AuthService) {}
  addUser(): void {
    this.dialog.open(AdduserComponent,
    {width: '450px'}
    ).afterClosed().subscribe(res=>{
      this.getUser();
    });
  }
  //Pop up to Delete a user
  deleteUser(element:any): void {
    this.dialog.open(DeleteUserComponent,
    {width: '450px',data: {id : element.id, name: element.name,email: element.email,role:element.role}}
    ).afterClosed().subscribe(res=>{
      this.getUser();
    });
  }
  //Pop up to Edit a user
  editUser(element:any): void {
      this.dialog.open(EditUserComponent,
      {width: '450px',data: {id : element.id, name: element.name, email: element.email, role:element.role}}
      ).afterClosed().subscribe(res=>{
        this.getUser();
      });
  }

}

//Add a new user

@Component({
  selector: 'add_user',
  styleUrls: ['add_user.component.css'],
  templateUrl: 'add_user.component.html',
})
export class AdduserComponent implements OnInit{
  response:any;
  roles: Role[] = [
    {role: 'Patient'},
    {role: 'Doctor'},
    {role: 'Staff'},
  ];

  AddnewUser : FormGroup;
  constructor(private auth: AuthService,
    private addUser: MatDialogRef<AdduserComponent>,
    private formBuilder:FormBuilder,private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void {
    this.addUser.close();
  }

  ngOnInit(){

    this.AddnewUser = this.formBuilder.group({

      name:["",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email:["",[
        Validators.required,
        Validators.email
      ]],
      password:["",[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}')
      ]],
      select_role:["",[
          Validators.required
      ]]  })

  }
  onAddnewUserSubmit(){

    var request = this.AddnewUser.value;
    this.auth.addnewUser(request).subscribe(res=>{
      this.response = res;
      this.addUser.close();
      this._toastr.success("Added Successful");

    });

  }
}

//Delete user

@Component({
  selector: 'delete_user',
  styleUrls: ['delete_user.component.css'],
  templateUrl: 'delete_user.component.html',
})
export class DeleteUserComponent implements OnInit{

  response;

  constructor(  private auth:AuthService,
    private deleteUser: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private _toastr: ToastrService) {}

  onNoClick(): void {
    this.deleteUser.close();}

  ngOnInit(){  }

  DeleteUserSubmit(){
    this.auth.delete_user(this.data.id).subscribe(res=>{
      this.response = res;
      this.deleteUser.close();
      this._toastr.success("Deleted Successful");
    });
  }
}


//Edit user

@Component({
  selector: 'edit_user',
  styleUrls: ['edit_user.component.css'],
  templateUrl: 'edit_user.component.html',
})
export class EditUserComponent implements OnInit{
  response;
  roles: Role[] = [
    {role: 'Patient'},
    {role: 'Doctor'},
    {role: 'Staff'},
  ];

  EditAuser : FormGroup;
  constructor(  private auth:AuthService,
    private editUser: MatDialogRef<EditUserComponent>,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User, private _toastr: ToastrService) {}

  onNoClick(): void {
    this.editUser.close();
  }

  ngOnInit(){

    this.EditAuser = this.formBuilder.group({
      name:[ this.data.name,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email:[ this.data.email,[
        Validators.required,
        Validators.email
      ]],
      select_role:[this.data.role,[
        Validators.required
      ]]

    })
  }
  editUserSubmit(){

    var request = this.EditAuser.value;
    this.auth.edit_user(request, this.data.id).subscribe(res=>{
      this.response = res;
      this.editUser.close();
      this._toastr.success("Edited Successful");
    });
  }

}

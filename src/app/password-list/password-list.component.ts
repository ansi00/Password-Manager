import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import {  Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AES , enc} from 'crypto-js';





@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule,NgFor,AsyncPipe,NgIf],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

siteId !: string ;
siteName !: string ;
siteUrl !: string ;
siteImgURL !: string ;

passwordList !: Array <any> ;

email !: string ;
username !: string ;
password !: string ;
passwordId !: string ;

formState : string = "Add New";

isSuccess : boolean = false ;
successMessage : string = '';

  constructor(private route : ActivatedRoute, private passwordManagerService : PasswordManagerService){
    this.route.queryParams.subscribe((val)=>{     
this.siteId = val['id'];
this.siteName = val['siteName'] ;
this.siteUrl = val['siteUrl'] ;
this.siteImgURL = val['siteImgURL'] ;

    })

    this.loadPasswords();
  }


  resetForm(){
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add New';
    this.passwordId = '';
  }

onSubmit(values : any){

  const encryptedPassword = this.encryptPassword(values.password);
  values.password = encryptedPassword;

if(this.formState == "Add New"){
  this.passwordManagerService.addPassword(values, this.siteId)
.then(()=>{
  this.showAlert('Data Saved Succesfully!')
  this.resetForm();
})
.catch(err =>{
  console.log(err);
  
})
}
else if(this.formState == "Edit"){
  this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
  .then(()=>{
    this.showAlert('Data Updated Succesfully!') 
    this.resetForm();
  })
  .catch(err =>{
    console.log(err);
    
  })
}


}

loadPasswords(){
  this.passwordManagerService.loadPasswords(this.siteId).subscribe((val : any)=>{
    this.passwordList = val ;
  })

}

editPassword(email : string, username : string, password : string, passwordId : string){

  this.email = email;
  this.username = username;
  this.password = password ;
  this.passwordId = passwordId;

  this.formState = "Edit";

}

deletePassword(passwordId : string){
this.passwordManagerService.deletePassword(  passwordId, this.siteId)
.then(()=>{
  this.showAlert('Data Deleted Succesfully!')
})
.catch(err =>{
  console.log(err);
  
})
}

showAlert(message : string){
  this.isSuccess = true ;
  this.successMessage = message ;
  }

  encryptPassword(password : string){
const secretKey = 'ZeuKTMXncooMQgZwzyxKdGl3XLkXUPyo';
const encryptedPassword = AES.encrypt(password, secretKey).toString();
return encryptedPassword;
  }

decryptPassword(password : string){
  const secretKey = 'ZeuKTMXncooMQgZwzyxKdGl3XLkXUPyo';
  const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
  return decPassword;
}

onDecrypt(password : string, index : number){
const decPassword = this.decryptPassword(password);
this.passwordList[index].password = decPassword ;

}
}

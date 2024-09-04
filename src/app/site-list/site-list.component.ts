import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';




@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule,NgFor,AsyncPipe,NgIf],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

allSites !: Observable <Array<any>>

siteName !: string ;
siteUrl !: string ;
siteImgURL !: string ;
siteId !: string ;

formState : string = 'Add New' ;
isSuccess : boolean = false ;
successMessage : string = '';

constructor(private passwordManager : PasswordManagerService){
  this.loadSites();
}

onSubmit(values:object){
  if(this.formState == 'Add New'){
    this.passwordManager.addSite(values)
    .then(()=>{
      this.showAlert('Data Saved Successfully!')
      })
      .catch(err => {
        console.log(err);
        
      })
  }
  else if (this.formState == 'Edit') {
    this.passwordManager.updateSite(this.siteId, values)
    .then(()=>{
      this.showAlert('Data Updated Successfully!')
      })
      .catch(err => {
        console.log(err);
        
      })
  }
}

loadSites(){
 this.allSites = this.passwordManager.loadSites()
}

editSite(siteName : string, siteURL : string, siteImgURL : string, id : string){
this.siteName = siteName ;
this.siteUrl = siteURL ;
this.siteImgURL = siteImgURL ;
this.siteId = id ;
this.formState = "Edit"
}

deleteSite(id : string){
this.passwordManager.deleteSite(id)
.then(()=>{
  this.showAlert('Data Deleted Successfully!')
  })
  .catch(err => {
    console.log(err);
    
  })
}

showAlert(message : string){
this.isSuccess = true ;
this.successMessage = message ;
}

}

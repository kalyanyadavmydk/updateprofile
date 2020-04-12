import { Component } from '@angular/core';
import {NgForm,FormsModule,ReactiveFormsModule, FormBuilder} from '@angular/forms'
import {HttpClient} from '@angular/common/http'
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'updateprofile';
  image;
  constructor(private http:HttpClient,private form:FormBuilder){}
  fileselect(event){
    if(event.target.files.length>0)
      {
        this.image=event.target.files[0]
      }
  }
  formsubmit(form:NgForm){
    if(form.invalid){
      return console.error("fill the Details");
    }
    console.log(this.image)
    console.log(form.value.dateofbirth)
    const formdata=new FormData()

        formdata.append("file",this.image,form.value.firstname+form.value.lastname)
        formdata.append("firstname",form.value.firstname)
        formdata.append("lastname",form.value.lastname)
        formdata.append("rollnumber",form.value.rollnumber)
        formdata.append("dateofbirth",form.value.dateofbirth)
        formdata.append("email",form.value.email)
        formdata.append("phonenumber",form.value.phonenumber)
        formdata.append("gender",form.value.gender)
        formdata.append("passedout",form.value.passedout)
        formdata.append("institution",form.value.institution)
        formdata.append("branch",form.value.branch)
        formdata.append("batch",form.value.batch)
        formdata.append("company",form.value.company)
        formdata.append("desgination",form.value.desgination)
        formdata.append("location",form.value.location)
        
        
        this.http.post<any>('http://localhost:3000/userdetails',formdata).subscribe((data)=>{
          console.log(data)
          
        })
      
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailedImageComponent } from './detailed-image/detailed-image.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {path : "", component : HomeComponent},
  {path : "register", component : RegisterComponent}, 
  {path : "login", component : LoginComponent},

  // The :id part of the path is a route parameter that can be accessed in the component
  {path : "image/:id", component : DetailedImageComponent},
  {path : "upload", component : UploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

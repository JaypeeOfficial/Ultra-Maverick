import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class WhRejectionApprovalService {
  public MySubject: BehaviorSubject<boolean>;
  ToDay: Date;
  Ending: Date;
  constructor(private httpClient : HttpClient) 
  {
    this.MySubject = new BehaviorSubject<boolean>(false);
  }

  
  toggleDetails()
  {
    this.MySubject.next(!this.MySubject.value);
  }
//Starting Method
  getAllProjectsRejectforApproval(): Observable<Project[]>
  {
    return this.httpClient.get<Project[]>("/api/ProjectsPartialPo/WHReject", { responseType: "json" })
      .pipe(map(
        (data: Project[] ) =>     
        {

          for (let i = 0; i < data.length; i++)
          {
            this.ToDay =  new Date();
   
           
          }
          return data;
        }
      ));
  }
//Break Method 

getAllProjectsCancelView(): Observable<Project[]>
{
  return this.httpClient.get<Project[]>("/api/projects/cancelled", { responseType: "json" })
    .pipe(map(
      (data: Project[] ) =>     
      {

        for (let i = 0; i < data.length; i++)
        {
          //data[i].teamSize = data[i].teamSize * 100;
         
        }
        return data;
      }
    ));
}

getProjectByProjectID(ProjectID: number): Observable<Project>
{
  return this.httpClient.get<Project>("/api/ProjectsPartialPo/searchbyprojectid/" + ProjectID, { responseType: "json" });
}

insertProject2(newProject: Project): Observable<Project>
{
  var requestHeaders = new HttpHeaders();
  requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
  return this.httpClient.post<Project>("/api/ProjectsPartialPo", newProject, { headers: requestHeaders, responseType: "json" });
}

updateProject(existingProject: Project): Observable<Project>
{
  return this.httpClient.put<Project>("/api/ProjectsPartialPo/WhReject/Approval", existingProject, { responseType: "json" }); 
}



}

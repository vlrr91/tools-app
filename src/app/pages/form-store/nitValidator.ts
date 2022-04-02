import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

interface Enterprise {
  id: string;
  name: string;
  nit: string;
}

@Injectable({
  providedIn: 'root'
})
export class NitValidatorService {

  constructor(private http: HttpClient) { }

  getNIT(nit: string): Observable<Enterprise>  {
    return this.http.get<Enterprise>(`http://localhost:3000/data/${nit}`);
  }

  isValidNIT(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.getNIT(control.value).pipe(
        map(data => data?.id ? null : { invalid: true }),
        catchError(() => of({ invalid: true }))
      );
    };
  }
}

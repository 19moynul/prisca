import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private toastrService: NbToastrService) { }
  message(position: any, status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status, position });
  }
}

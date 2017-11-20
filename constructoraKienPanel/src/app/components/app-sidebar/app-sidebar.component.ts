import { Component, ElementRef } from '@angular/core';

import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {

  constructor(private el: ElementRef, private permissionsService: NgxPermissionsService) { 
    if (localStorage.getItem('constructora_user_tipo') == '0') {

      const perm = ["SUPER"];
      this.permissionsService.flushPermissions();
      this.permissionsService.loadPermissions(perm);

      //console.log('soy SUPER');
    }
    else if (localStorage.getItem('constructora_user_tipo') == '2') {
      const perm2 = ["ADMIN"];
      this.permissionsService.flushPermissions();
      this.permissionsService.loadPermissions(perm2);

      //console.log('soy ADMIN');
    }
  }

  //wait for the component to render completely
  ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}

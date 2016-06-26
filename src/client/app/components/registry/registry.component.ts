// libs
import {Store} from '@ngrx/store';

// app
import {FormComponent} from '../../frameworks/core.framework/index';
import {UserService} from '../../shared/services/gift.service';

@FormComponent({
  moduleId: module.id,
  selector: 'sd-registry',
  templateUrl: 'registry.component.html',
  styleUrls: ['registry.component.css']
})
export class RegistryComponent {
  public newName: string = '';
  constructor(private store: Store<any>, public userService: UserService) {
  
  }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
/*  addName(): boolean {
    this.userService.post(this.newName);
    this.newName = '';
    return false;
  }*/
}

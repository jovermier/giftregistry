import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {disableDeprecatedForms, provideForms} from '@angular/forms/index';

// libs 
import {provideStore} from '@ngrx/store';

import {t} from '../../frameworks/test.framework/index';
import {TEST_CORE_PROVIDERS, TEST_HTTP_PROVIDERS, TEST_ROUTER_PROVIDERS} from '../../frameworks/core.framework/testing/index';
import {NameListService, nameListReducer} from '../../frameworks/app.framework/index';
import {TEST_MULTILINGUAL_PROVIDERS} from '../../frameworks/i18n.framework/testing/index';
import {RegistryComponent} from './registry.component';

export function main() {
  t.describe('@Component: RegistryComponent', () => {
    // Disable old forms
    let providerArr: any[];

    t.be(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });
    
    t.it('should work',
      t.inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            rootTC.detectChanges();

            let registryInstance = rootTC.debugElement.children[0].componentInstance;
            let registryDOMEl = rootTC.debugElement.children[0].nativeElement;

            t.e(registryInstance.nameListService).toEqual(jasmine.any(NameListService));
            t.e(getDOM().querySelectorAll(registryDOMEl, 'li').length).toEqual(0);

            registryInstance.newName = 'Minko';
            registryInstance.addName();
            rootTC.detectChanges();

            t.e(getDOM().querySelectorAll(registryDOMEl, 'li').length).toEqual(1);

            t.e(getDOM().querySelectorAll(registryDOMEl, 'li')[0].textContent).toEqual('Minko');
          });
      }));
  });
}

@Component({
  viewProviders: [
    TEST_CORE_PROVIDERS(),
    TEST_HTTP_PROVIDERS(),
    TEST_ROUTER_PROVIDERS(),
    TEST_MULTILINGUAL_PROVIDERS(),
    provideStore({ names: nameListReducer }),
    NameListService
  ],
  selector: 'test-cmp',
  directives: [RegistryComponent],
  template: '<sd-registry></sd-registry>'
})
class TestComponent {
  
}

import {t, selectDropdownByValue} from '../../frameworks/test.framework/index';

declare var browser: any, element: any, by: any;

t.describe('Registry', function() {

  t.be(function() {
    browser.get('/');
  });

  t.it('should have correct h2', function() {
      t.e(element(by.css('sd-app sd-registry h2')).getText()).toEqual('I love technology!');
  });
 
  t.it('should have an input', function() {
    t.e(element(by.css('sd-app sd-registry form input')).isPresent()).toEqual(true);
  });

  t.it('should have a list of computer scientists', function() {
    t.e(element(by.css('sd-app sd-registry ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  t.it('should add a name to the list using the form', function() {
    element(by.css('sd-app sd-registry form input')).sendKeys('Tim Berners-Lee');
    element(by.css('sd-app sd-registry form button')).click();
    t.e(element(by.css('sd-app sd-registry ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });
  
  t.it('language switcher should change language', function() {
    t.e(element(by.css('sd-app sd-registry h2')).getText()).toEqual('I love technology!');
    selectDropdownByValue('sd-app sd-toolbar lang-switcher select', 'fr', 500);
    t.e(element(by.css('sd-app sd-registry h2')).getText()).toEqual(`J'adore la technologie !`);
    t.e(element(by.css('sd-app sd-registry')).all(by.tagName('p')).first().getText())
      .toEqual(`En récompense, voici une liste de géniaux informaticiens :`);
  });

});

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON('https://crossorigin.me/http://api.dronestre.am/data');
  }
});

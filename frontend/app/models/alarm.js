import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  start_time: DS.attr('date'),
  end_time: DS.attr('date'),
  last_notified: DS.attr('date'),
  name: DS.attr('string'),
  direction: DS.attr('string'),
  line: DS.attr('string')
});
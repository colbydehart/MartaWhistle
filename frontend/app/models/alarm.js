import DS from 'ember-data';

export default DS.Model.extend({
  start_location: DS.attr('number'),
  start_time: DS.attr('time'),
  end_time: DS.attr('time'),
  last_notified: DS.attr('date'),
  name: DS.attr('string'),
  direction: DS.attr('string'),
  line: DS.attr('string'),
  travel_time: DS.attr('number'),
  humanStartTime: Ember.computed('start_time', function() {
    return moment(this.get('start_time'), 'H:m').format('h:mma');
  }),
  humanEndTime: Ember.computed('end_time', function() {
    return moment(this.get('end_time'), 'H:m').format('h:mma');
  }),
  startLocation: Ember.computed('start_location', function() {
    return this.get('store').peekRecord('location', this.get('start_location'));
  })
});

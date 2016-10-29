import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit() {
      this.set('mode', 'edit');
    },
    show() {
      this.set('mode', 'show');
    }
  },
  classNames: ['alarm'],
  inEditMode: Ember.computed('mode', function() {
    return 'edit' === this.get('mode');
  }),
  mode: 'show'
});

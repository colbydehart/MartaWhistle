import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  ajax: Ember.inject.service(),

  actions: {
    register() {
      this.set('errorMessage', undefined);

      if (this.get('password') !== this.get('passwordConfirmation')) {
        this.set('errorMessage', 'Password and confirmation do not match.');
        return;
      }

      let userData = {
        first_name: this.get('firstName'),
        last_name: this.get('lastName'),
        email: this.get('email'),
        password: this.get('password'),
        phone: this.get('phone')
      };

      this.get('ajax').post('/api/users', { data: userData })
      .then(() => {
        let { email, password } = this.getProperties('email', 'password');
        this.get('session').authenticate('authenticator:oauth2', email, password)
        .then(() => {
          this.get('sessionAccount').loadCurrentUser();
        });
      }).catch(() => {
        this.set('errorMessage', 'An error occurred, please try again');
      });
    }
  }
});

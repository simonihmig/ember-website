import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | ember-community-survey-2019', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:ember-community-survey-2019');

    assert.ok(route);
  });
});

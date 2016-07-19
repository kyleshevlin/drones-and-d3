import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('strike-visual', 'Integration | Component | strike visual', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{strike-visual}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#strike-visual}}
      template block text
    {{/strike-visual}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

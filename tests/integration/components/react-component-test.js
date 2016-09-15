import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'react-component',
  'Integration: ReactComponentComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{react-component}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)

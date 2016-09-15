import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'react-component',
  'Integration: ReactComponentComponent',
  {
    integration: true
  },
  function () {
    let props, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      props = {
        componentDidMount: sandbox.spy(),
        componentWillMount: sandbox.spy(),
        componentWillUnmount: sandbox.spy(),
        renderComponent: true
      }

      this.setProperties(props)

      this.render(hbs`
        {{#if renderComponent}}
          {{react-component
            componentDidMount=componentDidMount
            componentWillMount=componentWillMount
            componentWillUnmount=componentWillUnmount
          }}
        {{/if}}
      `)
    })

    it('renders', function () {
      expect(this.$()).to.have.length(1)
    })

    it('calls componentWillMount() once', function () {
      expect(props.componentWillMount.callCount).to.equal(1)
    })

    it('calls componentDidMount() once', function () {
      expect(props.componentDidMount.callCount).to.equal(1)
    })

    it('does not call componentWillUnmount', function () {
      expect(props.componentWillUnmount.callCount).to.equal(0)
    })

    describe('when component destroyed', function () {
      beforeEach(function () {
        this.set('renderComponent', false)
      })

      it('does not call componentWillMount()', function () {
        expect(props.componentWillMount.callCount).to.equal(1)
      })

      it('does not call componentDidMount()', function () {
        expect(props.componentDidMount.callCount).to.equal(1)
      })

      it('calls componentWillUnmount once', function () {
        expect(props.componentWillUnmount.callCount).to.equal(1)
      })
    })
  }
)

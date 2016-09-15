import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'
import sinon from 'sinon'

function resetCounts (props) {
  [
    'componentDidMount',
    'componentDidUpdate',
    'componentWillMount',
    'componentWillReceiveProps',
    'componentWillUnmount',
    'componentWillUpdate',
    'getDefaultProps'
  ]
    .forEach((key) => {
      props[key].reset()
    })
}

function destroyedTests (ctx) {
  describe('when component destroyed', function () {
    beforeEach(function () {
      resetCounts(ctx.props)
      this.set('renderComponent', false)
    })

    it('does not call getDefaultProps()', function () {
      expect(ctx.props.getDefaultProps.callCount).to.equal(0)
    })

    it('does not call componentWillMount()', function () {
      expect(ctx.props.componentWillMount.callCount).to.equal(0)
    })

    it('does not call componentDidMount()', function () {
      expect(ctx.props.componentDidMount.callCount).to.equal(0)
    })

    it('does not call componentWillReceiveProps()', function () {
      expect(ctx.props.componentWillReceiveProps.callCount).to.equal(0)
    })

    it('does not call componentWillUpdate()', function () {
      expect(ctx.props.componentWillUpdate.callCount).to.equal(0)
    })

    it('does not call componentDidUpdate()', function () {
      expect(ctx.props.componentDidUpdate.callCount).to.equal(0)
    })

    it('calls componentWillUnmount once', function () {
      expect(ctx.props.componentWillUnmount.callCount).to.equal(1)
    })
  })
}

describeComponent(
  'react-component',
  'Integration: ReactComponentComponent',
  {
    integration: true
  },
  function () {
    const ctx = {}
    let sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()

      ctx.props = {
        componentDidMount: sandbox.spy(),
        componentDidUpdate: sandbox.spy(),
        componentWillMount: sandbox.spy(),
        componentWillReceiveProps: sandbox.spy(),
        componentWillUnmount: sandbox.spy(),
        componentWillUpdate: sandbox.spy(),
        getDefaultProps: sandbox.stub().returns({}),
        renderComponent: true
      }

      this.setProperties(ctx.props)

      this.render(hbs`
        {{#if renderComponent}}
          {{react-component
            componentDidMount=componentDidMount
            componentDidUpdate=componentDidUpdate
            componentWillMount=componentWillMount
            componentWillReceiveProps=componentWillReceiveProps
            componentWillUnmount=componentWillUnmount
            componentWillUpdate=componentWillUpdate
            foo=foo
            getDefaultProps=getDefaultProps
          }}
        {{/if}}
      `)
    })

    it('renders', function () {
      expect(this.$()).to.have.length(1)
    })

    it('calls getDefaultProps() once', function () {
      expect(ctx.props.getDefaultProps.callCount).to.equal(1)
    })

    it('calls componentWillMount() once', function () {
      expect(ctx.props.componentWillMount.callCount).to.equal(1)
    })

    it('calls componentDidMount() once', function () {
      expect(ctx.props.componentDidMount.callCount).to.equal(1)
    })

    it('does not call componentWillReceiveProps()', function () {
      expect(ctx.props.componentWillReceiveProps.callCount).to.equal(0)
    })

    it('does not call componentWillUpdate()', function () {
      expect(ctx.props.componentWillUpdate.callCount).to.equal(0)
    })

    it('does not call componentDidUpdate()', function () {
      expect(ctx.props.componentDidUpdate.callCount).to.equal(0)
    })

    it('does not call componentWillUnmount', function () {
      expect(ctx.props.componentWillUnmount.callCount).to.equal(0)
    })

    describe('when property updated', function () {
      beforeEach(function () {
        resetCounts(ctx.props)
        this.set('foo', 'bar')
      })

      it('does not call getDefaultProps()', function () {
        expect(ctx.props.getDefaultProps.callCount).to.equal(0)
      })

      it('does not call componentWillMount()', function () {
        expect(ctx.props.componentWillMount.callCount).to.equal(0)
      })

      it('does not call componentDidMount()', function () {
        expect(ctx.props.componentDidMount.callCount).to.equal(0)
      })

      it('calls componentWillReceiveProps() once', function () {
        expect(ctx.props.componentWillReceiveProps.callCount).to.equal(1)
      })

      it('calls componentWillUpdate() once', function () {
        expect(ctx.props.componentWillUpdate.callCount).to.equal(1)
      })

      it('calls componentDidUpdate() once', function () {
        expect(ctx.props.componentDidUpdate.callCount).to.equal(1)
      })

      it('does not call componentWillUnmount', function () {
        expect(ctx.props.componentWillUnmount.callCount).to.equal(0)
      })

      destroyedTests.call(this, ctx)
    })

    destroyedTests.call(this, ctx)
  }
)

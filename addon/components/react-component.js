import Ember from 'ember'
const {Component, typeOf} = Ember
import PropTypeMixin from 'ember-prop-types'

/**
 * Wire React's componentDidMount() into Ember component's life cycle
 */
export function setupComponentDidMount () {
  this.on('didInsertElement', () => {
    if (typeOf(this.componentDidMount) === 'function') {
      this.componentDidMount()
    }
  })
}

/**
 * Wire React's componentWillUnmount() into Ember component's life cycle
 */
export function setupComponentWillUnmount () {
  this.on('willDestroyElement', () => {
    if (typeOf(this.componentWillUnmount) === 'function') {
      this.componentWillUnmount()
    }
  })
}

/**
 * This component is just a basic Ember component that has React's Component API
 * sitting on top of it.
 *
 * NOTE: PropTypeMixin gives us the React method getDefaultProps() as well as
 *       handles propery validation by looking at propTypes
 *
 * TODO: Implement the following React methods
 *
 *       - componentDidUpdate()
 *       - componentWillReceiveProps()
 *       - componentWillUpdate()
 *       - getInitialState()
 *       - setState()
 *       - shouldComponentUpdate()
 */
export default Component.extend(PropTypeMixin, {
  init () {
    this._super()

    setupComponentDidMount.call(this)
    setupComponentWillUnmount.call(this)

    if (typeOf(this.componentWillMount) === 'function') {
      this.componentWillMount()
    }
  }
})

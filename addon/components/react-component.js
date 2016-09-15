import Ember from 'ember'
const {Component, typeOf} = Ember
import PropTypeMixin from 'ember-prop-types'

export function fire (methodName, args) {
  if (typeOf(this[methodName]) !== 'function') {
    return
  }

  if (args) {
    this[methodName](...args)
  } else {
    this[methodName]()
  }
}

/**
 * Convert Ember attributes object to format of React properties
 * @param {EmberAttrs} attrs - Ember attributes (from didReceiveAttrs hook)
 * @returns {ReactProps} Ember attributes as React properties
 */
export function getPropsFromAttrs (attrs) {
  const props = {}

  if (typeOf(attrs) !== 'object') {
    return props
  }

  Object.keys(attrs)
    .forEach((key) => {
      props[key] = attrs[key].value
    })

  return props
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
 *       - getInitialState()
 *       - setState()
 *       - shouldComponentUpdate()
 */
export default Component.extend(PropTypeMixin, {
  init () {
    this._super()

    let nextProps, prevProps
    let nextState = {}
    let prevState = {}

    this.on('didUpdateAttrs', ({newAttrs, oldAttrs}) => {
      nextProps = getPropsFromAttrs(newAttrs)
      prevProps = getPropsFromAttrs(oldAttrs)

      fire.call(this, 'componentWillReceiveProps', [nextProps])
    })

    const didReceiveAttrs = ({newAttrs, oldAttrs}) => {
      nextProps = getPropsFromAttrs(newAttrs)
      prevProps = getPropsFromAttrs(oldAttrs)
    }

    this.on('didReceiveAttrs', didReceiveAttrs)

    this.on('didInsertElement', () => {
      this.off('didReceiveAttrs', didReceiveAttrs)
      fire.call(this, 'componentDidMount')
    })

    this.on('willUpdate', () => {
      fire.call(this, 'componentWillUpdate', [nextProps, nextState])
    })

    this.on('didUpdate', () => {
      fire.call(this, 'componentDidUpdate', [prevProps, prevState])
    })

    this.on('willDestroyElement', () => {
      fire.call(this, 'componentWillUnmount')
    })

    fire.call(this, 'componentWillMount')
  }
})

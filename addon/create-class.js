import ReactComponent from './components/react-component'

/**
 * Creates a composite component class given a class specification.
 *
 * @param {Object} spec - class specification
 * @returns {Ember.Component} Ember component
 */
export default function (spec) {
  return ReactComponent.extend(spec)
}

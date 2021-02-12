import React from 'react'

import SignUpForm from './SignUpForm'

export default class FooterForm extends React.Component {
  render() {
    return (
      <li className="menu-item">
        <SignUpForm {...this.props} />
      </li>
    )
  }
}

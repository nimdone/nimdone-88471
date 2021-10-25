import React from 'react'
import _ from 'lodash'

import { htmlToReact, classNames, markdownify } from '../utils'
import CtaButtons from './CtaButtons'

export default class SectionPricing extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null)
    console.log('section', section)
    console.log('this.props', this.props)
    return (
      <section
        id={_.get(section, 'section_id', null)}
        className={
          'block pricing-block bg-' +
          _.get(section, 'background', null) +
          ' outer'
        }
      >
        <div className="block-header inner-small">
          {_.get(section, 'title', null) && (
            <h2 className="block-title">{_.get(section, 'title', null)}</h2>
          )}
          {_.get(section, 'subtitle', null) && (
            <p className="block-subtitle">
              {htmlToReact(_.get(section, 'subtitle', null))}
            </p>
          )}
        </div>
        {_.get(section, 'pricing_plans', null) && (
          <div className="inner">
            <div className="grid">
              {_.map(
                _.get(section, 'pricing_plans', null),
                (plan, plan_idx) => (
                  <div key={plan_idx} className="cell plan">
                    <div
                      className={classNames('card', {
                        highlight: _.get(plan, 'highlight', null),
                      })}
                    >
                      <div className="plan-header">
                        {_.get(plan, 'title', null) && (
                          <h3 className="plan-title">
                            {_.get(plan, 'title', null)}
                          </h3>
                        )}
                        {_.get(plan, 'subtitle', null) && (
                          <div className="plan-subtitle">
                            {_.get(plan, 'subtitle', null)}
                          </div>
                        )}
                        {_.get(plan, 'price', null) && (
                          <div className="plan-price">
                            {_.get(plan, 'price', null)}
                          </div>
                        )}
                        {_.map(
                          _.get(plan, 'saving', null),
                          (saving) =>
                            saving.show && (
                              <div className="plan-price">
                                {_.get(saving, 'label', null)}
                              </div>
                            ),
                        )}
                      </div>
                      {_.get(plan, 'actions', null) &&
                        !_.get(plan, 'institution', null) && (
                          <div className="plan-footer block-buttons">
                            <CtaButtons
                              {...this.props}
                              actions={_.get(plan, 'actions', null)}
                              customStyle={{
                                width: '70%',
                                height: '56px',
                                borderRadius: '8px',
                                background: '#006366',
                                border: 'none',
                              }}
                            />
                          </div>
                        )}
                      <div className="plan-content">
                        {markdownify(_.get(plan, 'details', null))}
                      </div>
                      {_.get(plan, 'actions', null) &&
                        _.get(plan, 'institution', null) && (
                          <div className="plan-footer block-buttons">
                            <CtaButtons
                              {...this.props}
                              actions={_.get(plan, 'actions', null)}
                              customStyle={{
                                background: '#DEF4EA',
                                border: 'none',
                                color: '#006266',
                              }}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </section>
    )
  }
}

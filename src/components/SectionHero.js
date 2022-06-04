import React from 'react'
import _ from 'lodash'

import { markdownify } from '../utils'
import CtaButtons from './CtaButtons'

class SectionHero extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null)
    const subtitleAsText = markdownify(section.subtitle)
    return (
      <section
        id={_.get(section, 'section_id', null)}
        className="block hero-block bg-accent outer"
      >
        <div className="inner">
          <div className="grid">
            <div className="cell block-preview">
            <iframe width="766" height="500" src="https://www.youtube.com/embed/5A17LkhSpUk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="cell block-content">
              {_.get(section, 'title', null) && (
                <h2 className="block-title underline">
                  {_.get(section, 'title', null)}
                </h2>
              )}
              <div className="block-copy">
                {markdownify(_.get(section, 'content', null))}
              </div>
              {_.get(section, 'actions', null) && (
                <div className="block-buttons">
                  <CtaButtons
                    {...this.props}
                    actions={_.get(section, 'actions', null)}
                  />
                </div>
              )}
              <div className="subtitle">{subtitleAsText}</div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SectionHero

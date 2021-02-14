import React from 'react'
import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { markdownify } from '../utils'
import CtaButtons from './CtaButtons'

class SectionHero extends React.Component {
  render() {
    const {
      data: { image },
    } = this.props
    let section = _.get(this.props, 'section', null)
    return (
      <section
        id={_.get(section, 'section_id', null)}
        className="block hero-block bg-accent outer"
      >
        <div className="inner">
          <div className="grid">
            {image && (
              <div className="cell block-preview">
                <Image
                  fluid={image.childImageSharp.fluid}
                  alt={_.get(section, 'image_alt', null)}
                />
              </div>
            )}
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
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const ComponentWithQuery = (props) => (
  <StaticQuery
    render={(data) => <SectionHero {...props} data={data} />}
    query={graphql`
      {
        image: file(absolutePath: { regex: "/Picture2/" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 608) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
  />
)

export default ComponentWithQuery

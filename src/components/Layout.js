import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import { withPrefix } from '../utils'
import '../sass/main.scss'
import Header from './Header'
import Footer from './Footer'

export default class Body extends React.Component {
  render() {
    let title =
      _.get(this.props, 'pageContext.frontmatter.title', null) +
      ' | ' +
      _.get(this.props, 'pageContext.site.siteMetadata.title', null)
    let font =
      _.get(this.props, 'pageContext.site.siteMetadata.base_font', null) ||
      'nunito-sans'
    if (_.get(this.props, 'pageContext.frontmatter.meta_title', null)) {
      title = _.get(this.props, 'pageContext.frontmatter.meta_title', null)
    }
    let domain = _.trim(
      _.get(this.props, 'pageContext.site.siteMetadata.domain', null),
      '/'
    )
    const imagePath = `https://${domain}/images/Frame%20241.svg`
    const description = _.get(
      this.props,
      'pageContext.frontmatter.meta_description',
      null
    )
    console.log(domain+_.get(this.props, "pageContext.url", null));
        
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />

          {/* for google */}
          <meta name="google" content="notranslate" />
          <meta name="description" content={description} />

          {/* for twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={description}/>
          <meta name="twitter:title" content={title}/>

          {/* open graph editing starts here */}
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="nimdone" />
          <meta property="og:url" content={domain+_.get(this.props, "pageContext.url", null)}/>


          <meta name="og:title" content={title} />
          <meta name="og:image" content={imagePath} />
          <meta name="og:description" content={description} />


          {/* href lang  */}
          <link rel="alternate" href=" https://www.nimdone.com/" hreflang="en-us" />
          {_.get(this.props, 'pageContext.frontmatter.canonical_url', null) ? (
            
            <link
              rel="canonical"
              href={_.get(
                this.props,
                'pageContext.frontmatter.canonical_url',
                null
              )}
            />
            
          ) : (
            _.get(this.props, 'pageContext.site.siteMetadata.domain', null) &&
            (() => {
              let page_url = withPrefix(
                _.get(this.props, 'pageContext.url', null)
              )
              return <link rel="canonical" href={domain + page_url} />
            })()
          )}
          {_.get(this.props, 'pageContext.frontmatter.no_index', null) && (
            <meta name="robots" content="noindex,follow" />
          )}
          {font !== 'system-sans' && (
            <link rel="preconnect" href="https://fonts.gstatic.com" />
          )}
          {font === 'nunito-sans' ? (
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          ) : (
            font === 'fira-sans' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap"
                rel="stylesheet"
              />
            )
          )}
          {_.get(this.props, 'pageContext.site.siteMetadata.favicon', null) && (
            <link
              rel="icon"
              href={withPrefix(
                _.get(this.props, 'pageContext.site.siteMetadata.favicon', null)
              )}
            />
          )}
          <body
            className={
              'palette-' +
              _.get(this.props, 'pageContext.site.siteMetadata.palette', null) +
              ' font-' +
              _.get(this.props, 'pageContext.site.siteMetadata.base_font', null)
            }
          />
        </Helmet>
        <div id="page" className="site">
          <Header {...this.props} />
          <main id="content" className="site-content">
            {this.props.children}
          </main>
          <Footer {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}

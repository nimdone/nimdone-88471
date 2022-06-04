import React from "react";
import _ from "lodash";

import { Link, withPrefix, classNames } from "../utils";
import Action from "./Action";
import NavForm from "./NavForm";
import { webAppUrl, chromeExtUrl } from "../config";

export default class Header extends React.Component {
  renderAction = (action, action_idx) => {
    let page_url = _.trim(_.get(this.props, "pageContext.url", null), "/");
    let action_url = _.trim(_.get(action, "url", null), "/");
    let action_style = _.get(action, "style", null) || "link";
    return (
      <li
        key={action_idx}
        className={classNames("menu-item", {
          "current-menu-item": page_url === action_url,
          "menu-button": action_style !== "link",
        })}
      >
        <Action {...this.props} action={action} />
      </li>
    );
  };

  render() {
    return (
      <header id="masthead" className="site-header outer">
        <div>
          <div className="site-header-inside">
            <div className="site-branding">
              {_.get(
                this.props,
                "pageContext.site.siteMetadata.header.logo_img",
                null
              ) && (
                <p className="site-logo">
                  <Link to={withPrefix("/")}>
                    <img
                      src={withPrefix(
                        _.get(
                          this.props,
                          "pageContext.site.siteMetadata.header.logo_img",
                          null
                        )
                      )}
                      alt={_.get(
                        this.props,
                        "pageContext.site.siteMetadata.header.logo_img_alt",
                        null
                      )}
                    />
                  </Link>
                </p>
              )}
              {_.get(this.props, "pageContext.frontmatter.template", null) ===
                "landing" ||
              _.get(this.props, "pageContext.frontmatter.template", null) ===
                "blog" ? (
                <h1
                  className={classNames("site-title", {
                    "screen-reader-text": _.get(
                      this.props,
                      "pageContext.site.siteMetadata.header.logo_img",
                      null
                    ),
                  })}
                >
                  <Link to={withPrefix("/")}>
                    {_.get(
                      this.props,
                      "pageContext.site.siteMetadata.title",
                      null
                    )}
                  </Link>
                </h1>
              ) : (
                <p
                  className={classNames("site-title", {
                    "screen-reader-text": _.get(
                      this.props,
                      "pageContext.site.siteMetadata.header.logo_img",
                      null
                    ),
                  })}
                >
                  <Link to={withPrefix("/")}>
                    {_.get(
                      this.props,
                      "pageContext.site.siteMetadata.title",
                      null
                    )}
                  </Link>
                </p>
              )}
            </div>
            {_.get(
              this.props,
              "pageContext.site.siteMetadata.header.nav_links",
              null
            ) &&
              _.get(
                this.props,
                "pageContext.site.siteMetadata.header.has_nav",
                null
              ) && (
                <React.Fragment>
                  <nav
                    id="main-navigation"
                    className="site-navigation"
                    aria-label="Main Navigation"
                  >
                    <div className="site-nav-inside">
                      <button id="menu-close" className="menu-toggle">
                        <span className="screen-reader-text">Open Menu</span>
                        <span className="icon-close" aria-hidden="true" />
                      </button>
                      <ul className="menu">
                        {_.map(
                          _.get(
                            this.props,
                            "pageContext.site.siteMetadata.header.nav_links",
                            null
                          ),
                          this.renderAction
                        )}
                        <button
                          onClick={() => window.open(chromeExtUrl, "_blank")}
                          className="chrome-button-style"
                        >
                          <svg aria-hidden="true" width="1792" height="1792" viewBox="0 0 1792 1792" className="chrome-icon" xmlns="http://www.w3.org/2000/svg"><path d="M893 0q240-2 451 120 232 134 352 372l-742-39q-160-9-294 74.5t-185 229.5l-276-424q128-159 311-245.5t383-87.5zm-747 405l337 663q72 143 211 217t293 45l-230 451q-212-33-385-157.5t-272.5-316-99.5-411.5q0-267 146-491zm1586 169q58 150 59.5 310.5t-48.5 306-153 272-246 209.5q-230 133-498 119l405-623q88-131 82.5-290.5t-106.5-277.5zm-836 20q125 0 213.5 88.5t88.5 213.5-88.5 213.5-213.5 88.5-213.5-88.5-88.5-213.5 88.5-213.5 213.5-88.5z" fill="#666666"></path></svg>
                           Add to Chrome
                        </button>
                        <button
                          onClick={() => window.open(webAppUrl, "_blank")}
                          className="login-button-style"
                        >
                          Login
                        </button>
                        {/* <NavForm
                          section={_.get(
                            this.props,
                            'pageContext.site.siteMetadata.header.form',
                            null
                          )}
                          site={this.props.pageContext.site}
                        /> */}
                      </ul>
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle">
                    <span className="screen-reader-text">Close Menu</span>
                    <span className="icon-menu" aria-hidden="true" />
                  </button>
                </React.Fragment>
              )}
          </div>
        </div>
      </header>
    );
  }
}

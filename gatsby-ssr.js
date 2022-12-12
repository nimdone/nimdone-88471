/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const withPrefix = require("./src/utils/withPrefix").default;

exports.onRenderBody = function ({ setHeadComponents, setPostBodyComponents }) {
  setHeadComponents([
    <React.Fragment>
      <script src={withPrefix("js/fb-pixel.js")} />
      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=521088480063794&ev=PageView&noscript=1"
        />
      </noscript>
    </React.Fragment>,
  ]);

  setPostBodyComponents([
    <React.Fragment>
      <script src={withPrefix("js/plugins.js")} />
      <script src={withPrefix("js/init.js")} />
      <script src={withPrefix("js/main.js")} />
    </React.Fragment>,
  ]);
};

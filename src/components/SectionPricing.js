import React from "react";
import _ from "lodash";

import { htmlToReact, classNames, markdownify } from "../utils";
import CtaButtons from "./CtaButtons";

export default class SectionPricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAnnual: true };
  }

  toggleAnnualPackage = () => this.setState({ isAnnual: !this.state.isAnnual });

  render() {
    const { isAnnual } = this.state;
    let section = _.get(this.props, "section", null);
    return (
      <section
        id={_.get(section, "section_id", null)}
        className={"pricing-section block pricing-block  " + " outer"}
      >
        <div className="block-header pricing-header">
          <div className="background-style"></div>
          {_.get(section, "title", null) && (
            <h2 className="block-title">{_.get(section, "title", null)}</h2>
          )}
          {_.get(section, "subtitle", null) && (
            <p className="block-subtitle">
              {htmlToReact(_.get(section, "subtitle", null))}
            </p>
          )}
          {_.get(section, "fineprint", null) && (
            <p className="block-fineprint">
              {htmlToReact(_.get(section, "fineprint", null))}
            </p>
          )}
          {/* <div> */}

          {/* </div> */}
          {_.get(section, "pricing_plans", null) && (
            <div className="inner">
              <div className="grid">
                {_.map(
                  _.get(section, "pricing_plans", null),
                  (plan, plan_idx) => (
                    <div key={plan_idx} className="cell plan">
                      <div
                        className={classNames("card", {
                          highlight: _.get(plan, "highlight", null),
                        })}
                      >
                        <div className="plan-header">
                          {_.get(plan, "title", null) && (
                            <h3 className="plan-title">
                              {_.get(plan, "title", null)}
                            </h3>
                          )}
                          {_.get(plan, "subtitle", null) && (
                            <div className="plan-subtitle">
                              {_.get(plan, "subtitle", null)}
                            </div>
                          )}
                          {_.get(plan, "saas", null) && (
                            <div
                              className="plan"
                              style={{ paddingTop: !isAnnual ? "33px" : "" }}
                            >
                              {_.get(
                                plan,
                                `price_${isAnnual ? "annual" : "monthly"}`,
                                null
                              )}
                            </div>
                          )}
                          {!_.get(plan, "saas", null) && (
                            <div className="plan" style={{ paddingTop: "" }}>
                              {_.get(plan, "price_annual", null)}
                            </div>
                          )}
                          {isAnnual &&
                            _.map(
                              _.get(plan, "saving", null),
                              (saving) =>
                                saving.show &&
                                isAnnual && (
                                  <div className="plan-price">
                                    {_.get(saving, "label", null)}
                                  </div>
                                )
                            )}
                          {_.get(plan, "saas", null) && !isAnnual && (
                            <div className="plan-price">
                              {_.get(
                                _.get(section, "annual_saving", null),
                                "title",
                                null
                              )}
                            </div>
                          )}
                        </div>
                        {_.get(plan, "saas", null) && (
                          <div className="toogle-btn-div">
                            <label class="switch">
                              <span>
                                <input type="checkbox" checked={isAnnual} />
                                <span
                                  onClick={this.toggleAnnualPackage}
                                  class="slider round"
                                />
                              </span>
                            </label>
                          </div>
                        )}
                        {_.get(plan, "actions", null) &&
                          !_.get(plan, "institution", null) && (
                            <div className="plan-footer block-buttons">
                              <CtaButtons
                                {...this.props}
                                actions={_.get(plan, "actions", null)}
                                customStyle={{
                                  width: "70%",
                                  height: "56px",
                                  borderRadius: "8px",
                                  background: "#006366",
                                  border: "none",
                                  marginBottom: "28px",
                                }}
                                iconStyle={{
                                  marginLeft: "10px",
                                }}
                              />
                            </div>
                          )}
                        <div className="plan-content">
                          {markdownify(_.get(plan, "details", null))}
                        </div>
                        {_.get(plan, "actions", null) &&
                          _.get(plan, "institution", null) && (
                            <div className="plan-footer block-buttons">
                              <CtaButtons
                                {...this.props}
                                actions={_.get(plan, "actions", null)}
                                customStyle={{
                                  background: "#DEF4EA",
                                  border: "none",
                                  color: "#006266",
                                  borderRadius: "8px",
                                  width: "241.11px",
                                  height: "56.13px",
                                }}
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        {_.get(section, "remark_feature", null) && (
          <div className="remark-feature-div">
            {_.map(_.get(section, "remark_feature", null), (item, rem_id) => (
              <div>
                <img src={item.image} />
                {_.get(item, "title", null) && (
                  <span>{markdownify(_.get(item, "title", null))}</span>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="contact-us">
          {_.get(section, "contact", null) && (
            <div>
              {_.get(_.get(section, "contact", null), "information", null) &&
                markdownify(
                  _.get(_.get(section, "contact", null), "information", null)
                )}
            </div>
          )}
          {_.get(_.get(section, "contact", null), "actions", null) && (
            <CtaButtons
              {...this.props}
              actions={_.get(_.get(section, "contact", null), "actions", null)}
              customStyle={{
                background: "#FFF",
                border: "none",
                borderRadius: "8px",
                color: "#006266",
              }}
            />
          )}
        </div>
      </section>
    );
  }
}

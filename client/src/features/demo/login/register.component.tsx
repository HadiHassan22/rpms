import { RootState } from "&store/store";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { push } from "redux-first-history";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { loginActions } from "./login.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const RegisterComponent = (props: ReduxProps) => {
  const { register, isLoggedIn, admin, push } = props;

  /**
   * i18n translation function.
   * Takes namespace/s as params and nothing for default.
   */
  const { t } = useTranslation(["login"]);

  /**
   * useEffect perfeorms side-effects on component rendering.
   * It takes a function for side-effects and a dependency list.
   * When dependency list is empty, useEffect runs each time the component rerenders
   * Adding variables to the dependency list will cause useEffect to run each time a variable changes
   */
  useEffect(() => {
    // Write your side-effects here
    if (isLoggedIn) {
      push("/student");
    }
  }, [isLoggedIn, push]);

  const handleLoginFormSubmit = (values: any) => {
    register(values);
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} sm={24} md={18} lg={8} xl={8}>
        <Card bordered={false}>
          <h1>{"Register Page"}</h1>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={handleLoginFormSubmit}
          >
            <Form.Item name="name">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("USER_NAME")}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("REQUIRED_EMAIL") },
                { type: "email", message: t("VALID_EMAIL") },
                {
                  pattern: new RegExp(
                    "([a-zA-Z0-9_\\-\\.]+)@((?<![wd])mail(?![wd])).((?<![wd])aub(?![wd])).((?<![wd])edu(?![wd])|(?<![wd])lb(?![wd]))"
                  ),
                  message: "please enter a valid university email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder={t("EMAIL")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: t("REQUIRED_PASSWORD") },
                {
                  min: 8,
                  message: t("MIN_LENGTH_PASSWORD"),
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={"Password"}
              />
            </Form.Item>

            <Form.Item
              name="password2"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match"
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={"Confirm password"}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {"Register"}
              </Button>
              {t("OR")} <a href="#/login">{t("LOG_IN")}</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
  isLoggedIn: state.login.isLoggedIn,
  admin: state.login.admin,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  register: loginActions.makeRegisterApiCall,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const RegisterComponentRedux = connector(RegisterComponent);

export { RegisterComponentRedux as RegisterComponent };

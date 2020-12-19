import { RootState } from "&store/store";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
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

const LoginComponent = (props: ReduxProps) => {
  const { logIn, isLoggedIn, admin, push } = props;

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
      admin ? push("/chairperson") : push("/student");
    }
  }, [isLoggedIn, push]);

  const handleLoginFormSubmit = (values: any) => {
    logIn(values);
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} sm={24} md={18} lg={8} xl={8}>
        <Card bordered={false}>
          <h1>{t("LOGIN_PAGE")}</h1>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={handleLoginFormSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("REQUIRED_EMAIL") },
                { type: "email" },
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
                placeholder={t("PASSWORD")}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("REMEMBER_ME")}</Checkbox>
              </Form.Item>

              <a href="#/">{t("FORGOT_PASSWORD")}</a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t("LOG_IN")}
              </Button>
              {t("OR")} <a href="#/register">{t("REGISTER_NOW")}</a>
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
  logIn: loginActions.makeLoginApiCall,
  push,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const LoginComponentRedux = connector(LoginComponent);

export { LoginComponentRedux as LoginComponent };

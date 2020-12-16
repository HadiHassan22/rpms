import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Input,
  Button,
  Form,
  Card,
  Checkbox,
  Col,
  Row,
  Select,
  Space,
} from "antd";

import { RootState } from "&store/store";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { homeActions } from "./home.slice";
import { loginActions } from "&features/demo/login/login.slice";
import { Option } from "antd/lib/mentions";

type ReduxProps = ConnectedProps<typeof connector>;

const HomeComponent = (props: ReduxProps) => {
  const { logout } = props;
  const [petitionType, setPetitionType] = useState("capacity");
  /**
   * useEffect performs side-effects on component rendering.
   * It takes a function for side-effects and a dependency list.
   * When dependency list is empty, useEffect runs each time the component rerenders
   * Adding variables to the dependency list will cause useEffect to run each time a variable changes
   */

  return (
    <Row justify={"center"}>
      <Col xs={24} sm={24} md={18} lg={8} xl={8}>
        <Card bordered={true}>
          <h1>{"Create a Petition"}</h1>
          <Form
            name="create_petition"
            initialValues={{ remember: false }}
            onFinish={(values: Object) => {
              alert(JSON.stringify(values));
            }}
          >
            <Form.Item
              name="petition_type"
              rules={[
                { required: true, message: "Please enter type of petition" },
              ]}
            >
              <Select
                defaultValue="Petition Type"
                onChange={(value: any) => setPetitionType(value)}
              >
                <Option value="capacity">Capacity</Option>
                <Option value="corequisite">Co-Requisite</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="course"
              rules={[{ required: true, message: "Please enter course" }]}
            >
              <Select defaultValue="Course" style={{ width: "50%" }}>
                <Option value="cmps272">CMPS 272</Option>
                <Option value="cmps255">CMPS 255</Option>
              </Select>
            </Form.Item>

            {petitionType === "corequisite" ? (
              <Form.Item
                name="course2"
                rules={[{ required: true, message: "Please enter course" }]}
              >
                <Select defaultValue="Course" style={{ width: "50%" }}>
                  <Option value="cmps272">CMPS 272</Option>
                  <Option value="cmps255">CMPS 255</Option>
                </Select>
              </Form.Item>
            ) : null}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {"Submit petition"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <a href="#/">{"Go to chairperson view"}</a>
        <Button onClick={logout}>Log out</Button>
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
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  logout: loginActions.reset,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const HomeComponentRedux = connector(HomeComponent);

export { HomeComponentRedux as HomeComponent };

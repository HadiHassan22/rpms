import React, { useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { Button, Form, Card, Col, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { Circle } from "rc-progress";

import { RootState } from "&store/store";
import { loginActions } from "&features/demo/login/login.slice";

/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { petitionActions } from "./petitions.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();
  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }
  return (
    progressData && (
      <Circle
        style={{ height: "30px" }}
        strokeWidth={10}
        strokeColor={progress === 100 ? "#00a626" : "#2db7f5"}
        percent={progress}
      />
    )
  );
};

const PetitionComponent = (props: ReduxProps) => {
  const { logout, addPetition } = props;
  const [petitionType, setPetitionType] = useState("capacity");
  const dispatch = useDispatch();

  return (
    <Row justify={"center"}>
      <Col xs={24} sm={24} md={18} lg={8} xl={8}>
        <Card bordered={true}>
          <h1>{"Create a Petition"}</h1>
          <Form
            name="create_petition"
            initialValues={{ remember: false }}
            onFinish={(values: Object) => {
              dispatch(addPetition(JSON.stringify(values)));
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
              <Uploady
                autoUpload={false}
                destination={{ url: "/api/transcript" }}
                sendWithFormData={false}
              >
                <div
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UploadButton text="Upload Transcript" />
                  <UploadProgress />
                </div>
              </Uploady>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {"Submit petition"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <a href="#/chairperson">{"Go to chairperson view"}</a>
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
  addPetition: petitionActions.addPetition,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const PetitionComponentRedux = connector(PetitionComponent);

export { PetitionComponentRedux as PetitionComponent };

import { loginActions } from "&features/demo/login/login.slice";
import { RootState } from "&store/store";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { replace } from "redux-first-history";
import {
  createPetition,
  createStudentGrades,
  getRules,
} from "../../../api/petition.api";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { petitionActions } from "./petitions.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const PetitionComponent = (props: ReduxProps) => {
  const { logout, addPetition, email, replace } = props;

  const initialCoursesState = [] as any[];

  const [petitionType, setPetitionType] = useState("capacity");
  const [courses, setCourses] = useState(initialCoursesState);
  const [grades, setGrades] = useState(initialCoursesState);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getRules();
        setCourses(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCourses();
  }, []);

  const storePetition = async (body: any) => {
    const response = await createPetition(body);
    addPetition(response.data);
  };

  const handleSubmit = async (values: any) => {
    const course = values.course;
    const courseRules = courses.filter((value) => value.course_name === course);
    const requirementsMet = courseRules.every((rule) => {
      alert(rule.prerequisiteCourseName + " " + rule.prerequisiteCourseGrade);
      return (
        parseInt(
          grades.find(
            (grade) => grade.course_name === rule.prerequisiteCourseName
          )?.grade ?? "0"
        ) >= parseInt(rule.prerequisiteCourseGrade)
      );
    });

    await createStudentGrades({
      student_id: values.student_id,
      courses: grades,
    });
    await storePetition({
      ...values,
      ...{
        status: "pending",
        email: email,
        requirements: requirementsMet ? "met" : "unmet",
      },
    });
    replace("/student");
  };

  let fileReader: FileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result as string;
    const document = new DOMParser().parseFromString(content, "text/html");
    const $ = (s) => document.getElementsByClassName(s);
    const _ = (s) => document.getElementsByTagName(s);
    // const table = $(".datadisplaytable");
    const rows: HTMLCollectionOf<HTMLTableRowElement> = _("tr");
    const courses: HTMLCollectionOf<HTMLTableDataCellElement>[] = [];

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.getElementsByTagName("td").length === 9) {
        courses.push(row.getElementsByTagName("td"));
      }
    }

    var all_courses: Object[] = [];
    for (var j = 1; j < courses.length; j++) {
      var course = {
        course_name:
          courses[j].item(0)?.innerText + " " + courses[j].item(1)?.innerText,
        grade: courses[j].item(4)?.innerText,
      };
      all_courses.push(course);
    }

    setGrades(all_courses);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  /// to create the text area
  const { TextArea } = Input;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Row justify={"center"}>
      <Col xs={24} sm={24} md={18} lg={8} xl={8}>
        <Card bordered={true}>
          <h1>{"Create a Petition"}</h1>
          <Form
            name="create_petition"
            initialValues={{ remember: false }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="student_name"
              rules={[
                { required: true, message: "Please enter your name" },
                {
                  type: "string",
                  message: "please enter your name",
                  //len: 40,
                },
              ]}
            >
              <Input
                minLength={4}
                maxLength={40}
                placeholder={"Student name"}
              ></Input>
            </Form.Item>
            <Form.Item
              name="major"
              rules={[
                { required: true, message: "Please enter your Major" },
                {
                  type: "string",
                  message: "Please enter a your Major",
                  //len: 10,
                },
              ]}
            >
              <Input minLength={3} maxLength={40} placeholder={"Major"}></Input>
            </Form.Item>

            <Form.Item
              name="student_id"
              rules={[
                { required: true, message: "Please enter your student ID" },
                {
                  type: "string",
                  pattern: new RegExp("^[0-9]{9}$"),
                  message: "Please enter a valid ID",
                  //len:9
                },
              ]}
            >
              <Input
                minLength={9}
                maxLength={9}
                placeholder={"Student ID Number"}
              ></Input>
            </Form.Item>
            <Form.Item
              name="type"
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
                <Option value="restriction">Restriction</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="course"
              rules={[{ required: true, message: "Please enter course" }]}
            >
              <Select defaultValue="Course" style={{ width: "50%" }}>
                {courses.map((course) => (
                  <Option value={course.course_name}>
                    {course.course_name}
                  </Option>
                ))}
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

            <Form.Item
              name="details"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <TextArea
                minLength={0}
                maxLength={150}
                placeholder={"Ruther explain your reasons for this petition"}
              ></TextArea>
            </Form.Item>

            <Input
              addonBefore="Upload Transcript"
              onChange={(e: any) => handleFileChosen(e.target.files[0])}
              type="file"
            ></Input>
            <Divider style={{ color: "transparent" }} />
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit" block>
                {"Submit petition"}
              </Button>
              <div style={{ height: 15 }}></div>
              <Button type="default" onClick={() => replace("/student")} block>
                {"Go back"}
              </Button>
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
  petitions: state.petition,
  email: state.login.email,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  logout: loginActions.reset,
  addPetition: petitionActions.addPetition,
  replace,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const PetitionComponentRedux = connector(PetitionComponent);

export { PetitionComponentRedux as PetitionComponent };

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Form,
  Input,
  Layout,
  Menu,
  Popconfirm,
  Radio,
  Space,
  Table,
  Tag,
  Modal,
  Typography,
  Button,
  InputNumber,
} from "antd";
import { BookOutlined, FileDoneOutlined } from "@ant-design/icons";
import {
  getPetitions,
  getRules,
  postRule,
  updatePetition,
} from "../../../api/petition.api";

import { RootState } from "&store/store";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { petitionActions } from "./petitions.slice";
import { loginActions } from "&features/demo/login/login.slice";
import { EditableCell } from "./editableCell";
import Item from "antd/lib/list/Item";


type ReduxProps = ConnectedProps<typeof connector>;

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const ChairPersonComponent = (props: ReduxProps) => {
  const {
    petitions,
    setPetitions,
    acceptPetition,
    rejectPetition,
    reset,
  } = props;
  const [visible, setVisible] = useState(false);

  const [viewState, setViewState] = useState("petitions");

  const inputNode = <Input />;

  const dispatch = useDispatch();
  

  interface Item {
    key: string;
    course_name: string;
    prerequisiteCourseName: string;
    prerequisiteCourseGrade: string;
  }
  

  

  const originData = [] as any;
  const initCourses = [] as any;
  const [ruleData, setData] = useState(originData);
  const [studentCourses, setStudentCourses] = useState(initCourses);

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        reset();
        const response = await getPetitions();
        setPetitions({ petitions: response.data });
        const ruleResponse = await getRules();
        for (let i = 0; i < ruleResponse.data.length; i++) {
          originData.push({
            key: i.toString(),
            ...ruleResponse.data[i],
          });
        }
        setData(originData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPetitions();
  }, [visible]);

  const accept = async (id: String) => {
    const response = await updatePetition({ status: "accepted" }, id);
    acceptPetition(response.data._id);
  };

  const reject = async (id: String) => {
    const response = await updatePetition({ status: "rejected" }, id);
    rejectPetition(response.data._id);
  };


  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      filters:[
        {
          text: 'capacity',
          value: 'capacity',
        },
        {
        text: 'co-requiste',
        value: 'co-requiste',
        },
        {
          text: 'restriction',
          value: 'restriction',
        },

        
      
      ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
    sorter: (a, b) => a.type.length - b.type.length,
    sortDirections: ['descend'],
    },
    {
      title: "Course",
      dataIndex: "course",
      filters: studentCourses.map((course) =>{
        return {
          text: course.course_name,
          value: course.course_name,
        }
      }

      ), 
    onFilter: (value, record) => record.course.indexOf(value) === 0,
    sorter: (a, b) => a.course.length - b.course.length,
    sortDirections: ['descend'],
      
    },
    {
      title: "Course",
      dataIndex: "course2",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: String) => {
        switch (status) {
          case "accepted":
            return <Badge status="success" text={status} />;
          case "rejected":
            return <Badge status="error" text={status} />;
          default:
            return <Badge status="processing" text={status} />;
        }
      },
    },
    {
      title: "Requirements",
      key: "requirements",
      dataIndex: "requirements",
      render: (record: any) => {
        return record.requirements === "unmet" ? (
          <Tag color={"error"}>Not met</Tag>
        ) : (
          <Tag color={"success"}>Met</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => accept(record._id)}>Accept </a>
          <a onClick={() => reject(record._id)} style={{ color: "red" }}>
            Reject
          </a>
        </Space>
      ),
    },
  ];
  

  

  
  const ruleColumns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      width: "20%",
      editable: true,
    },
    {
      title: "Prerequisite Course",
      dataIndex: "prerequisiteCourseName",
      width: "20%",
      editable: true,
    },
    {
      title: "Prerequisite Grade",
      dataIndex: "prerequisiteCourseGrade",
      width: "20%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a onClick={() => edit(record)}>Edit</a>
        );
      },
    },
  ];
  
  

  const onCreate = async (values) => {
    postRule(values);
    setVisible(false);
  };

  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

 const data = petitions.map((petition) => ({
  key: petition._id,
  ...petition
}));

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...ruleData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = ruleColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" style={{ height: "32px", margin: "16px" }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              color: "white",
              fontFamily: "Arial",
            }}
          >
            {"<>RPMS"}
          </Title>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item
            key="1"
            onClick={() => setViewState("petitions")}
            icon={<FileDoneOutlined />}
          >
            Petitions
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => setViewState("courses")}
            icon={<BookOutlined />}
          >
            Courses
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          {viewState === "petitions" ? (
            <Table
              rowSelection={{ type: "checkbox", ...rowSelection }}
              columns={columns}
              dataSource={data}
            />
          ) : (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                New Course Rule
              </Button>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={ruleData}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                />
              </Form>
              <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => setVisible(false)}
                onOk={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      form.resetFields();
                      onCreate(values);
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
              >
                <Form form={form} layout="vertical" name="form_in_modal">
                  <Form.Item
                    name="course_name"
                    label="Course Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the name of course!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="prerequisiteCourseName"
                    label="Prerequisite Course Name"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="prerequisiteCourseGrade"
                    label="Prerequisite Course Grade"
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <a href="#/login">{"Go to student view"}</a>
        </Footer>
      </Layout>
    </Layout>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // Map your redux state to your props here
  petitions: state.petition.petitions,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {
  // map your actions here ex:
  // increment : counterActions.increment
  reset: petitionActions.reset,
  setPetitions: petitionActions.setPetition,
  acceptPetition: petitionActions.acceptPetition,
  rejectPetition: petitionActions.rejectPetition,
};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const ChairPersonComponentRedux = connector(ChairPersonComponent);

export { ChairPersonComponentRedux as ChairPersonComponent };

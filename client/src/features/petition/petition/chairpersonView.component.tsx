import React, { useEffect } from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { Badge, Layout, Menu, Space, Table, Tag, Typography } from "antd";
import { BookOutlined, FileDoneOutlined } from "@ant-design/icons";
import { getPetitions, updatePetition } from "../../../api/petition.api";

import { RootState } from "&store/store";
/**
 * These are actions imported from the feature slices.
 * You can use 'useDispatch' hook or 'mapDispatchToProps'
 * to dispatch these actions
 */
import { petitionActions } from "./petitions.slice";
import { loginActions } from "&features/demo/login/login.slice";

type ReduxProps = ConnectedProps<typeof connector>;

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const ChairPersonComponent = (props: ReduxProps) => {
  const { petitions, setPetitions, acceptPetition, rejectPetition } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await getPetitions();
        setPetitions({ petitions: response.data });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPetitions();
  }, []);

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
    },
    {
      title: "Course",
      dataIndex: "course",
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
      render: (record: any) => {
        return record.type === "capacity" ? (
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

  const data = petitions;

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
          <Menu.Item key="1" icon={<FileDoneOutlined />}>
            Petitions
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            Courses
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* <Header></Header> */}
        {/* <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          {/* <div style={{ background: "#FFF", padding: 24, minHeight: 360 }}> */}
          <Table
            rowSelection={{ type: "checkbox", ...rowSelection }}
            columns={columns}
            dataSource={data}
          />
          {/* </div> */}
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

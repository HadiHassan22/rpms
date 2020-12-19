import { getPetitionsByStudent } from "&api/petition.api";
import { loginActions } from "&features/demo/login/login.slice";
import { RootState } from "&store/store";
import { FileDoneOutlined } from "@ant-design/icons";
import { Badge, Button, Layout, Menu, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { goBack, replace } from "redux-first-history";
import { petitionActions } from "./petitions.slice";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

type ReduxProps = ConnectedProps<typeof connector>;

const StudentViewComponent = (props: ReduxProps) => {
  const { email, petitions, reset, logout, setPetitions, replace } = props;

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        reset();
        const response = await getPetitionsByStudent(email);
        setPetitions({ petitions: response.data });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPetitions();
  }, []);

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
      title: "Note",
      dataIndex: "note",
    },
  ];

  const data = petitions;

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<FileDoneOutlined />}>
            Petitions
          </Menu.Item>
          <Menu.Item onClick={logout} key="2">
            Sign Out
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
          <Table columns={columns} dataSource={data} />
          {/* </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Button type="primary" onClick={() => replace("/home")}>
            Add Petition
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  petitions: state.petition.petitions,
  email: state.login.email,
});

const mapDispatchToProps = {
  logout: loginActions.reset,
  reset: petitionActions.reset,
  setPetitions: petitionActions.setPetition,
  replace,
  goBack,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
const StudentViewComponentRedux = connector(StudentViewComponent);

export { StudentViewComponentRedux as StudentViewComponent };

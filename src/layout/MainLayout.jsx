import React from "react";
import { Avatar, Button, Layout, Space, Typography, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
//components
import ChangeTheme from "../components/button/ChangeTheme";
import Credit from "../components/modal/Credit";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {

    const navigate = useNavigate();

    const {
        token: { colorBgBase },
    } = theme.useToken();

    return (
        <React.Fragment>
            <Layout style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%'
            }}>
                <Header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colorBgBase,
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    zIndex: 20
                }}>

                    <Button type="text" size="large" onClick={() => navigate('/')}>
                        <Space align="center">
                            <img src={'/dictionary.png'} style={{ display: 'block', width: '25px' }} />
                            <Typography.Text strong>Nerdtionary</Typography.Text>
                        </Space>
                    </Button>


                    <Space align="center">
                        <ChangeTheme />
                        <Credit />
                    </Space>
                </Header>
                <Content
                    style={{
                        backgroundColor: colorBgBase,
                        flexGrow: 1,
                        width: '100%',
                        overflowY: 'auto'
                    }}
                >
                    <Outlet />
                </Content>

                <Footer style={{
                    backgroundColor: colorBgBase,
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    zIndex: 20
                }}>
                    <Space>
                        <Typography.Text>
                            2310717302008
                        </Typography.Text>
                        <Typography.Text>
                            Danusorn Nikornbua
                        </Typography.Text>
                    </Space>
                </Footer>
            </Layout>
        </React.Fragment>
    )
}

export default MainLayout;
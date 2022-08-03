import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import routesDefine from './routes';
import LogoReact from '~/assets/react.svg';

function App() {
  const routes = useRoutes(routesDefine);
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useLocation().pathname || 'simple';
  const navigate = useNavigate();

  const toggle = () => setCollapsed(!collapsed);

  useEffect(() => {
    navigate('/simple');
  }, []);

  return (
    <div className='App'>
      <Layout className='layout-custom'>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to='/simple'>
            <img src={LogoReact} alt='react logo' className='logo' />
            <img src='/vite.svg' alt='react logo' className='logo' />
          </Link>
          <Menu theme='dark' mode='inline' selectedKeys={[pathname]}>
            {routesDefine.map((r) => {
              return (
                <Menu.Item key={r.path}>
                  <Link to={r.path}>{r.text}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Header className='site-layout-background' style={{ padding: 0 }}>
            {collapsed ? (
              <MenuUnfoldOutlined className='trigger' onClick={toggle} />
            ) : (
              <MenuFoldOutlined className='trigger' onClick={toggle} />
            )}
          </Header>
          <Content className='site-layout-background site-layout-content'>{routes}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

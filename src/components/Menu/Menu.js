import React from 'react';
import './Menu.css';
import { Menu, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  AppleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  CustomerServiceOutlined,
  TabletOutlined,
  ClockCircleOutlined,
  UsbOutlined,
  HomeOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';


class MenuM extends React.Component {
  state = {
    collapsed: true,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 256 }} className='menu'>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to={'/'}>Главная</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppleOutlined />}>
            <NavLink to={'/iphones'}>iPhone</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<TabletOutlined />}>
            <NavLink to={'/ipads'}>iPad</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<ClockCircleOutlined />}>
            <NavLink to={'/iwatchs'}>iWatch</NavLink>
          </Menu.Item>  
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            <NavLink to={'/macs'}>Mac</NavLink>
          </Menu.Item> 
          <Menu.Item key="6" icon={<CustomerServiceOutlined />}>
            <NavLink to={'/gajets'}>Гаджеты</NavLink>
          </Menu.Item> 
          <Menu.Item key="7" icon={<UsbOutlined />}>
            <NavLink to={'/accesoirs'}>Аксессуары</NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={<ShoppingCartOutlined />}>
            <NavLink to={'/cart'}>Корзина</NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default MenuM
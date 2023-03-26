import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CollectionsBookmark, Email, Home, Settings, WhatsApp } from '@mui/icons-material';
import logic from "./logic";
export interface SidebarProps {}

const Sidebar : React.FC<SidebarProps> = () => {

	useEffect(() => {
	  setTimeout(() => {
      logic();
    }, 100);
	}, []);
	

	return (
		<div className="sidebar">
        <div className="sidebar-inner">
          {/* <!-- ### $Sidebar Header ### --> */}
          <div className="sidebar-logo">
            <div className="peers ai-c fxw-nw">
              <div className="peer peer-greed">
                <Link className="sidebar-link td-n" to="/">
                  <div className="peers ai-c fxw-nw">
                    <div className="peer">
                      <div className="logo">
                        <img src="assets/static/images/logo.png" alt="Deleite Logo" title='Inicio' />
                      </div>
                    </div>
                    <div className="peer peer-greed">
                      {/* <h5 className="lh-1 mB-0 logo-text">Adminator</h5> */}
                      <h5 className="lh-1 mB-0 logo-text sidebar-icon">Deleite</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="peer">
                <div className="mobile-toggle sidebar-toggle">
                  <a href="" className="td-n">
                    <i className="ti-arrow-circle-left"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ### $Sidebar Menu ### --> */}
          <ul className="sidebar-menu scrollable pos-r">
            <li className="nav-item mT-30 actived">
              <NavLink to="/">
                <span className="icon-holder">
                  {/* <i className="c-blue-500 ti-home"></i> */}
                  <Home className="sidebar-icon" />
                </span>
                <span className="title">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle">
                <span className="icon-holder">
                    {/* <i className="c-red-500 ti-layers"></i> */}
                    <CollectionsBookmark className="sidebar-icon" />
                  </span>
                <span className="title">Catalogs</span>
                <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className='sidebar-link' to="categories">Categories</NavLink>
                </li>                 
                <li>
                  <NavLink className='sidebar-link' to="products">Products</NavLink>
                </li>
                <li>
                  <NavLink className='sidebar-link' to="ingredients">Ingredients</NavLink>
                </li>
                <li>
                  <NavLink className='sidebar-link' to="recipes">Recipes</NavLink>
                </li>
                <li>
                  <NavLink className='sidebar-link' to="users">Usuarios</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/email">
                <span className="icon-holder">
                  {/* <i className="c-brown-500 ti-email"></i> */}
                  <Email className="sidebar-icon" />
                </span>
                <span className="title">Email</span>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <a className='sidebar-link' href="calendar.html">
                <span className="icon-holder">
                  <i className="c-deep-orange-500 ti-calendar"></i>
                </span>
                <span className="title">Calendar</span>
              </a>
            </li> */}
            <li className="nav-item">
              <NavLink to="/messenger">
                <span className="icon-holder">
                  {/* <i className="c-deep-purple-500 ti-comment-alt"></i> */}
                  <WhatsApp className="sidebar-icon" />
                </span>
                <span className="title">Chat</span>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/settings">
                <span className="icon-holder">
                  <i className="c-deep-purple-500 ti-comment-alt"></i>
                  <Settings className="sidebar-icon" />
                </span>
                <span className="title">Settings</span>
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <a className='sidebar-link' href="charts.html">
                <span className="icon-holder">
                  <i className="c-indigo-500 ti-bar-chart"></i>
                </span>
                <span className="title">Charts</span>
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className='sidebar-link' href="forms.html">
                <span className="icon-holder">
                  <i className="c-light-blue-500 ti-pencil"></i>
                </span>
                <span className="title">Forms</span>
              </a>
            </li> */}
            {/* <li className="nav-item dropdown">
              <a className="sidebar-link" href="ui.html">
                <span className="icon-holder">
                    <i className="c-pink-500 ti-palette"></i>
                  </span>
                <span className="title">UI Elements</span>
              </a>
            </li> */}
            {/* <li className="nav-item dropdown">
              <a className="dropdown-toggle">
                <span className="icon-holder">
                  <i className="c-orange-500 ti-layout-list-thumb"></i>
                </span>
                <span className="title">Tables</span>
                <span className="arrow">
                  <i className="ti-angle-right"></i>
                </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className='sidebar-link' href="basic-table.html">Basic Table</a>
                </li>
                <li>
                  <a className='sidebar-link' href="datatable.html">Data Table</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle">
                <span className="icon-holder">
                    <i className="c-purple-500 ti-map"></i>
                  </span>
                <span className="title">Maps</span>
                <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="google-maps.html">Google Map</a>
                </li>
                <li>
                  <a href="vector-maps.html">Vector Map</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle">
                <span className="icon-holder">
                    <i className="c-red-500 ti-files"></i>
                  </span>
                <span className="title">Pages</span>
                <span className="arrow">
                    <i className="ti-angle-right"></i>
                  </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className='sidebar-link' href="blank.html">Blank</a>
                </li>                 
                <li>
                  <a className='sidebar-link' href="404.html">404</a>
                </li>
                <li>
                  <a className='sidebar-link' href="500.html">500</a>
                </li>
                <li>
                  <a className='sidebar-link' href="signin.html">Sign In</a>
                </li>
                <li>
                  <a className='sidebar-link' href="signup.html">Sign Up</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="dropdown-toggle">
                <span className="icon-holder">
                  <i className="c-teal-500 ti-view-list-alt"></i>
                </span>
                <span className="title">Multiple Levels</span>
                <span className="arrow">
                  <i className="ti-angle-right"></i>
                </span>
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item dropdown">
                  <a>
                    <span>Menu Item</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a>
                    <span>Menu Item</span>
                    <span className="arrow">
                      <i className="ti-angle-right"></i>
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a>Menu Item</a>
                    </li>
                    <li>
                      <a>Menu Item</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
	);
};

export default Sidebar;

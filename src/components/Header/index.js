import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBook, FaUserAlt } from "react-icons/fa";

import { Container, Profile, Content } from './styles';

export default function Header() {

  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <Link to="/main" >
          <div>
            <FaBook size={35} style={{ color: '#fff', marginRight: '3px' }} />
            <strong>My Shelf</strong>
          </div>
        </Link>
        <aside>
          <Profile>
            <div>
                <strong>Hello, {profile.name.trim().split(" ")[0]} !</strong>
              <Link to="/profile">
                <div>
                  <span>Profile</span>
                  <FaUserAlt size={23} style={{ color: '#fff', marginLeft: '8px' }} />
                </div>
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

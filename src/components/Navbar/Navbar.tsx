import React, { useState } from 'react';
import {
  Drawer,
  ActionIcon,
  NavLink,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBug, IconMenu2, IconList, IconLogout } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme(); // Use Mantine's color scheme hook

  const handleClose = () => setOpened(false); // Function to close the drawer

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the auth token
    navigate('/'); // Redirect to the Hero page
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={handleClose}
        title={
          <Link to="/" className={classes.drawerTitle} onClick={handleClose}>
            NEMO
          </Link>
        }
        size="xs"
        classNames={{ title: classes.drawerTitle }}
      >
        <NavLink
          label={
            <div className={classes.navLinkLabel}>
              <IconBug size={20} className={classes.icon} />
              <Link
                to="/issue-form"
                className={classes.link}
                onClick={handleClose}
              >
                Report An Outage
              </Link>
            </div>
          }
        />
        <NavLink
          label={
            <div className={classes.navLinkLabel}>
              <IconList size={20} className={classes.icon} />
              <Link
                to="/dashboard"
                className={classes.link}
                onClick={handleClose}
              >
                View All Outages
              </Link>
            </div>
          }
        />
        <NavLink
          label={
            <div className={classes.navLinkLabel}>
              <IconLogout size={20} className={classes.icon} />
              <Link
                to="/"
                className={classes.link}
                onClick={() => {
                  handleSignOut();
                  handleClose();
                }}
              >
                Sign Out
              </Link>
            </div>
          }
        />
      </Drawer>
      <ActionIcon
        onClick={() => setOpened(true)}
        className={classes.actionIcon}
        size="lg"
        variant="subtle"
      >
        <IconMenu2
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'} // Change color based on color scheme
        />
      </ActionIcon>
    </>
  );
};

export default Navbar;

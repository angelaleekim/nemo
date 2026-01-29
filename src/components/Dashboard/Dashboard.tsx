// import React, { useEffect, useState } from 'react';
import IssueTable from '../Table/IssueTable';
import {
  MantineProvider,
  Button,
  Switch,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  // const [checkingAuth, setCheckingAuth] = useState(true); // Add state to check authentication
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     window.location.href = '/login'; // Redirect unauthenticated users to the login page
  //   } else {
  //     setCheckingAuth(false); // Allow rendering if authenticated
  //   }
  // }, []);

  // if (checkingAuth) {
  //   return null; // Prevent rendering until authentication check is complete
  // }

  return (
    <MantineProvider>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.header}>
            <Button
              variant="filled"
              onClick={() => navigate('/issue-form')} // Navigate to outage form
            >
              + New Outage
            </Button>
            <Switch
              size="md"
              onLabel={<IconSun size={16} stroke={2.5} />}
              offLabel={<IconMoon size={16} stroke={2.5} />}
              checked={computedColorScheme === 'dark'}
              onChange={() =>
                setColorScheme(
                  computedColorScheme === 'light' ? 'dark' : 'light'
                )
              }
              className={classes.switch} // Use CSS module class
            />
          </div>
          <h1 className={classes.title}>Outage Dashboard</h1>
          <IssueTable />
        </div>
      </div>
    </MantineProvider>
  );
};

export default Dashboard;

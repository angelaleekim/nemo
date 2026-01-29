import React from 'react';
import classes from './Hero.module.css';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.text}>
        <h1 className={classes.title}>NEMO</h1>
        <p className={classes.subheading}>
          Notification Engine for Managing Outages
        </p>
        <p className={classes.subtitle}>
          Track and manage outages efficiently with real-time notifications and
          comprehensive monitoring tools.
        </p>
        <div className={classes.buttonContainer}>
          {/* <Link to="/register" className={classes.button}>
          Register
        </Link>
        <Link to="/login" className={classes.button}>
          Login
        </Link> */}
          <Link to="/dashboard" className={classes.button}>
            View Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

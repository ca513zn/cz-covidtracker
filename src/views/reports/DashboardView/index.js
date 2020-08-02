import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DashboardView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Covid Tracker">
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Grid container spacing={3}>
          <Grid item lg={12} xl={12} xs={12}>
            <LatestProjects />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;

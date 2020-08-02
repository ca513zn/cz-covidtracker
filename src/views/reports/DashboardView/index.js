import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CountryTable from './CountryTable';
import NewCases from './NewCases';
import Recovered from './Recovered';
import Deaths from './Deaths';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'axios';

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
  const [data, setData] = useState({});
  const isMountedRef = useIsMountedRef();

  const getProjects = useCallback(() => {
    axios.get('https://api.covid19api.com/summary').then(response => {
      if (isMountedRef.current) {
        setData(response.data);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <Page className={classes.root} title="Covid Tracker">
      <Container maxWidth={false} className={classes.container}>
        <Header />
        <Grid container spacing={3}>
          <Grid item lg={4} xl={12} xs={12}>
            <NewCases
              newCases={data.Global?.NewConfirmed}
              total={data.Global?.TotalConfirmed}
            />
          </Grid>
          <Grid item lg={4} xl={12} xs={12}>
            <Deaths
              newCases={data.Global?.NewDeaths}
              total={data.Global?.TotalDeaths}
            />
          </Grid>
          <Grid item lg={4} xl={12} xs={12}>
            <Recovered
              newCases={data.Global?.NewRecovered}
              total={data.Global?.TotalRecovered}
            />
          </Grid>
          <Grid item lg={12} xl={12} xs={12}>
            <CountryTable rows={data.Countries} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;

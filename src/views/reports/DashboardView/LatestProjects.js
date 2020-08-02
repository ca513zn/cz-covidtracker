import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import axios from 'axios';

import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(theme => ({
  root: {},
  technology: {
    height: 30,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'Country',
    numeric: false,
    disablePadding: false,
    label: 'Country'
  },
  {
    id: 'NewConfirmed',
    numeric: true,
    disablePadding: false,
    label: 'New Confirmed'
  },
  {
    id: 'TotalConfirmed',
    numeric: true,
    disablePadding: false,
    label: 'Total Confirmed'
  },
  {
    id: 'NewDeaths',
    numeric: true,
    disablePadding: false,
    label: 'New Deaths'
  },
  {
    id: 'TotalDeaths',
    numeric: true,
    disablePadding: false,
    label: 'Total Deaths'
  },
  {
    id: 'NewRecovered',
    numeric: true,
    disablePadding: false,
    label: 'New Recovered'
  },
  {
    id: 'TotalRecovered',
    numeric: true,
    disablePadding: false,
    label: 'Total Recovered'
  }
];

function EnhancedTableHead(props) {
  const {
    classes,

    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function LatestProjects({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [rows, setRows] = useState(null);
  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('Country');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getProjects = useCallback(() => {
    axios.get('https://api.covid19api.com/summary').then(response => {
      if (isMountedRef.current) {
        setRows(response.data.Countries);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (!rows) {
    return null;
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {/* <CardHeader
        action={<GenericMoreButton />}
        title="Latest Projects"
      />
      <Divider /> */}
      <PerfectScrollbar>
        <Box minWidth={700} maxHeight={500}>
          <Table size={'small'} stickyHeader={true}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      // selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default"
                      >
                        {row.Country}
                      </TableCell>
                      <TableCell align="right">{row.NewConfirmed}</TableCell>
                      <TableCell align="right">{row.TotalConfirmed}</TableCell>
                      <TableCell align="right">{row.NewDeaths}</TableCell>
                      <TableCell align="right">{row.TotalDeaths}</TableCell>
                      <TableCell align="right">{row.NewRecovered}</TableCell>
                      <TableCell align="right">{row.TotalRecovered}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <Box p={2} display="flex" justifyContent="flex-end">
        <Button component={RouterLink} size="small" to="/app/projects">
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box> */}
    </Card>
  );
}

LatestProjects.propTypes = {
  className: PropTypes.string
};

export default LatestProjects;

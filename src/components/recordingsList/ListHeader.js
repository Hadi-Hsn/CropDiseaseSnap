// libs
import React from 'react';
import { makeStyles } from '@mui/styles';

// mui
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Box, TableCell, TableRow } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  dataRowHeader: {
    '& .MuiTableCell-root': {
      padding: '20px 0px 16px 15px !important',
      border: '0px !important',
      fontSize: '16px !important',
      fontWeight: 'bold !important',
      color: '#3e437a !important',
      '&:first-child': {
        padding:
          theme.direction === 'rtl'
            ? '20px 30px 16px 0px !important'
            : '20px 0px 16px 30px !important'
      }
    }
  },
  tableSortLabel: {
    '@media (max-width: 480px)': {
      fontSize: '14px !important'
    }
  },
  activeTableSortLabel: {
    color: '#3e437a !important'
  },
  tableSortIcon: {
    color: '#858585 !important'
  }
}));

export default function ListHeader(props) {
  const classes = useStyles();
  const { order, orderBy, onRequestSort, headCells } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const sortDirection = (label) => {
    if (orderBy === label) {
      if (order === 1) {
        return 'asc';
      } else {
        return 'desc';
      }
    } else {
      return false;
    }
  };

  const direction = (label) => {
    if (orderBy === label) {
      if (order === 1) {
        return 'asc';
      } else {
        return 'desc';
      }
    }
  };

  return (
    <TableHead>
      <TableRow className={classes.dataRowHeader}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding="none"
            sortDirection={sortDirection(headCell.label)}
            colSpan={headCell.colSpan}>
            {headCell.sortable && (
              <TableSortLabel
                active={orderBy === headCell.label}
                direction={direction(headCell.label)}
                onClick={createSortHandler(headCell.label)}>
                {headCell.label}
                {orderBy === headCell.label ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === -1 ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
            {!headCell.sortable && <p>{headCell.label}</p>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

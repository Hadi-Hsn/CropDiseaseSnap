import React from 'react';

//mui
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  recordsCount: {
    fontSize: '16px',
    color: '#2e326b'
  },
  noContentMessage: {
    fontSize: '24px',
    fontWeight: 'bold !important',
    color: '#2e326b'
  },
  paginationPadding: {
    paddingTop: '30px'
  },
  box: {
    height: '100',
    display: 'flex',
    marginBottom: '20px'
  },
  spreadBox: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ul: {
    '& .MuiPaginationItem-root': {
      borderRadius: '8px !important'
    },
    '& .MuiPaginationItem-previousNext': {
      color: '#29B3B4 !important',
      borderRadius: '8px !important'
    },
    '& .Mui-selected': {
      background: '#37326D !important',
      color: '#fff',
      borderRadius: '8px !important'
    }
  }
}));
export default function PaginationComponent(props) {
  const { page, setSelectedPage, totalNumberOfRecords, displayedRecords } = props;
  const classes = useStyles();

  return (
    <Box
      component="span"
      className={`${classes.spreadBox} ${classes.box} ${classes.paginationPadding}`}>
      <Typography component="h4" variant="subtitle1" className={classes.recordsCount}>
        {`Showing ${displayedRecords} results out of ${totalNumberOfRecords}`}
      </Typography>
      <PaginationRow
        page={page}
        setSelectedPage={setSelectedPage}
        numberOfPages={props.totalPages}
      />
    </Box>
  );
}

export function PaginationRow(props) {
  const classes = useStyles();
  const { page, setSelectedPage, numberOfPages } = props;

  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        onChange={setSelectedPage}
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}

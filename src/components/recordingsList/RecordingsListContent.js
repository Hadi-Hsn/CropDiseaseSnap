/* eslint-disable no-unused-vars */
// libs
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// mui
import {
  Box,
  CircularProgress,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { makeStyles } from '@mui/styles';

// components
import CustomDialog from '../common/CustomDialog';
import PaginationComponent from './Pagination';

// assets
import artNoResults from '../../assets/art-no-results.svg';
import artIssueLoading from '../../assets/art-issue-loading.svg';

// services
import { getAllRecordings, deleteRecording, getRecordingsInfo } from '../../services/audioRecord';
import ListHeader from './ListHeader';
import ListStatusFilter from './ListStatusFilter';

const useStyles = makeStyles(() => ({
  header: {
    fontSize: '36px !important',
    fontWeight: 'bold !important',
    color: '#2e326b'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 84px 40px 84px !important'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '40px 84px 15px 84px !important'
  },
  pagePath: {
    padding: '20px 0px 0px 0px',
    fontSize: '14px',
    color: '#8e8e8e'
  },
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
  loader: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  emptyContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    paddingTop: '100px'
  },
  emptyText: {
    color: '#333333',
    fontSize: '21px',
    marginTop: '9px'
  },
  emptyImage: {
    width: '107px',
    height: '107px'
  },
  overflowed: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tealColor: {
    color: '#29B3B4 !important',
    fontWeight: 'bold !important'
  },
  redColor: {
    color: '#DC2752 !important',
    fontWeight: 'bold !important'
  },
  yellowColor: {
    color: '#F59700 !important',
    fontWeight: 'bold !important'
  },
  darkBlueColor: {
    color: '#007EB5 !important',
    fontWeight: 'bold !important'
  },
  greyColor: {
    color: '#8b88a5 !important',
    fontWeight: 'bold !important'
  },
  separatorRow: {
    backgroundColor: 'transparent',
    height: '12px',
    '& .MuiTableCell-root': {
      height: '3px',
      padding: '8px',
      border: 'none'
    }
  },
  dataTableContainer: {
    overflowX: 'hidden !important'
  },
  dataTable: {
    display: 'table',
    width: '100%',
    borderSpacing: '0',
    minWidth: '950px',
    tableLayout: 'fixed',
    borderCollapse: 'unset !important'
  },
  dataRow: {
    '& .MuiTableCell-root': {
      backgroundColor: '#fff',
      height: '68px',
      borderTop: '1px solid #f1f1f1',
      borderBottom: '1px solid #f1f1f1',
      color: '#2E326B',
      fontSize: '16px',
      wordWrap: 'break-word',
      boxShadow:
        '0px 5px 0px 0px rgba(0,0,0,.008),0px -5px 0px 0px rgba(0,0,0,.008),0px -5px 0px 0px rgba(0,0,0,.008),0px 5px 0px 0px rgba(0,0,0,.008) !important',
      '& .MuiButton-startIcon': {
        marginRight: '4px'
      },
      '&:first-child': {
        paddingLeft: '30px !important',
        borderTopLeftRadius: '20px !important',
        borderBottomLeftRadius: '20px !important',
        borderLeft: '1px solid #f1f1f1',
        color: '#2E326B !important',
        fontWeight: 'bold !important'
      },
      '&:last-child': {
        paddingRight: '30px !important',
        borderTopRightRadius: '20px !important',
        borderBottomRightRadius: '20px !important',
        borderRight: '1px solid #f1f1f1'
      },
      '@media (max-width: 480px)': {
        fontSize: '14px !important'
      }
    }
  },
  actionButton: {
    margin: '0px auto',
    width: '100px !important',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'unset !important'
  },
  capitalizeFirstChar: {
    textTransform: 'capitalize'
  },
  shadow: {
    boxShadow: '0px 5px 5px rgba(0,0,0,.03) !important',
    height: '10px',
    margin: '12px auto'
  }
}));

export default function RecordingsListContent() {
  const classes = useStyles();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [displayedRecords, setDisplayedRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [refreshRecordings, setRefreshRecordings] = useState(false);
  const [recordingInfo, setRecordingInfo] = useState([]);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    getRecordingsInfo().then((resp) => setRecordingInfo(resp.data));
    getAllRecordings(page)
      .then((response) => {
        setRecordings(
          response.data.map((record) => {
            return {
              id: record.id,
              recordingUrl: `https://mlporjectstorage.blob.core.windows.net/fileupload/${record?.name}`,
              age: record.name.split('_')[2],
              gender: record.name.split('_')[1],
              floor: record.name.split('_')[4]
            };
          })
        );
        setDisplayedRecords(response.data.length);
        setTotalPages(JSON.parse(response.headers.pagination).totalPages);
        setTotalNumberOfRecords(JSON.parse(response.headers.pagination).totalCount);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
        alert.error('Failed to retrieve recordings', {
          timeout: 10000
        });
      });
  }, [refreshRecordings, page]);

  const setSelectedPage = (e, page) => {
    setPage(page);
  };

  const closeDeleteDialogue = () => {
    setIsDeleteDialogOpen(false);
  };

  const deleteRecordingHandler = async () => {
    return deleteRecording(selectedRowId);
  };

  const onDeleteHandler = () => {
    setRefreshRecordings(!refreshRecordings);
  };

  const onDeleteClick = (row) => {
    setIsDeleteDialogOpen(true);
    setSelectedRowId(row.id);
  };

  const headCells = [
    {
      id: 1,
      label: 'Floor',
      sortable: true,
      colSpan: 1
    },
    {
      id: 2,
      label: 'Gender',
      sortable: true,
      colSpan: 1
    },
    {
      id: 3,
      label: 'Age',
      sortable: true,
      colSpan: 1
    },
    {
      id: 4,
      label: 'Recording',
      sortable: true,
      colSpan: 2
    },
    {
      id: 5,
      label: '',
      sortable: false,
      colSpan: 1
    }
  ];

  return (
    <React.Fragment>
      <CustomDialog
        isOpen={isDeleteDialogOpen}
        close={closeDeleteDialogue}
        action={deleteRecordingHandler}
        done={onDeleteHandler}
        title={'Delete Record'}
        subtitle={'Are you sure you want to delete this recording?'}
        confirmText={'Yes'}
        successMessage={'Successfully deleted the recording'}
        errorMessage={'Failed to delete the recording'}
        submittingText={'Deleting'}
      />
      <Box sx={{ width: '100%', minHeight: '400px' }}>
        {isLoading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        {!isLoading && error && (
          <Box className={classes.emptyContainer}>
            <img src={artIssueLoading} alt="" className={classes.emptyImage} />
            <p className={classes.emptyText}>Failed to load the recordings list</p>
          </Box>
        )}
        {!isLoading && !error && (!recordings || !recordings.length) && (
          <Box className={classes.emptyContainer}>
            <img src={artNoResults} alt="" className={classes.emptyImage} />
            <p className={classes.emptyText}>There are no recordings yet</p>
          </Box>
        )}
        {!isLoading && !error && recordings && !!recordings.length > 0 && (
          <TableContainer className={classes.dataTableContainer}>
            <ListStatusFilter recordingInfo={recordingInfo} />
            <Box className={classes.shadow}></Box>
            <Table className={classes.dataTable} aria-labelledby="tableTitle" size={'medium'}>
              <ListHeader headCells={headCells} />
              <TableBody>
                {recordings.map((row) => {
                  return (
                    <React.Fragment key={row.id}>
                      <TableRow hover className={classes.dataRow} tabIndex={-1}>
                        <TableCell align="left" colSpan={1}>
                          {row.floor}
                        </TableCell>
                        <TableCell className={classes.capitalizeFirstChar} align="left" colSpan={1}>
                          {row.gender}
                        </TableCell>
                        <TableCell align="left" colSpan={1}>
                          {row.age}
                        </TableCell>
                        <TableCell align="left" colSpan={2}>
                          <audio src={row.recordingUrl} controls />
                        </TableCell>
                        <TableCell align="left" colSpan={1}>
                          <Button onClick={() => onDeleteClick(row)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.separatorRow}>
                        <TableCell colSpan={1}></TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {totalNumberOfRecords !== 0 && (
          <PaginationComponent
            page={page}
            setSelectedPage={setSelectedPage}
            totalNumberOfRecords={totalNumberOfRecords}
            totalPages={totalPages}
            displayedRecords={displayedRecords}
          />
        )}
      </Box>
    </React.Fragment>
  );
}

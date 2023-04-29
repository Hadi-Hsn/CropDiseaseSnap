import Alert from '@mui/material/Alert';

export const CustomAlert = ({ style, options, message }) => {
  return (
    <Alert variant="filled" severity={options.type} style={style}>
      {message}
    </Alert>
  );
};

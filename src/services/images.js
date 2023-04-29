import API from './api';

export const submitImage = (data) => {
  return API.post('/File/UploadFile', data);
};

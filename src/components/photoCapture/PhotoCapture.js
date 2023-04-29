import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useTranslation } from 'react-i18next';
import { submitImage } from '../../services/images';
import { makeStyles } from '@mui/styles';
import ImagePreview from './ImagePreview';
import { useAlert } from 'react-alert';
import { LoadingButton } from '@mui/lab';

const useStyles = makeStyles(() => ({
  buttons: {
    margin: '15px 0 10px 10px !important',
    display: 'flex',
    gap: '15px !important'
  },
  textField: {
    width: '90% !important',
    margin: '15px 10px 0 10px !important'
  }
}));

function PhotoCapture() {
  const { t } = useTranslation();
  const classes = useStyles();
  const alert = useAlert();

  const [dataUri, setDataUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pestType, setPestType] = useState('');
  const [pestStage, setPestStage] = useState('');
  const [pestSeverity, setPestSeverity] = useState('');
  const [othersFileName, setOthersFileName] = useState('');
  const [naturalEnemy, setNaturalEnemy] = useState('none');

  useEffect(() => {
    if (pestType === 'Others') {
      setFileName(othersFileName);
    } else if (pestType !== '' && pestStage !== '' && pestSeverity !== '') {
      setFileName(`${pestType}_${naturalEnemy}_${pestStage}_${pestSeverity}`);
    } else if (pestType !== '' && pestStage !== '') {
      setFileName(`${pestType}_${naturalEnemy}_${pestStage}`);
    } else if (pestType !== '') {
      setFileName(`${pestType}_${naturalEnemy}`);
    }
  }, [pestType, pestStage, pestSeverity, othersFileName, naturalEnemy]);

  function handleTakePhotoAnimationDone(dataUri) {
    setDataUri(dataUri);
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }
  console.log(fileName);
  const submitDataHandler = async () => {
    if (fileName.trim() !== '') {
      let unique = uuidv4();
      var convertedFile = dataURLtoFile(dataUri, `image_${fileName}_${unique}.png`);
      const formData = new FormData();
      formData.append('files', convertedFile, `images/image_${fileName}_${unique}.png`);
      setIsLoading(true);
      return submitImage(formData)
        .then(() => {
          alert.success(t('SUCCESSFULLY_UPLOADED_YOUR_IMAGE'));
          setDataUri('');
          setIsLoading(false);
        })
        .catch(() => {
          alert.error(t('FAILED_TO_UPLOAD_YOUR_IMAGE'));
          setIsLoading(false);
        });
    } else {
      if (pestType === 'Others') {
        alert.error(t('PLEASE_ENTER_A_FILE_NAME'));
      } else {
        alert.error(t('PLEASE_CHOOSE_A_FILE_NAME'));
      }
    }
  };

  const handlePestTypeChange = (event) => {
    setPestType(event.target.value);
    setPestStage('');
    setPestSeverity('');
  };

  const handleNaturalEnemiesChange = (event) => {
    setNaturalEnemy(event.target.value);
  };

  const handlePestStageChange = (event) => {
    setPestStage(event.target.value);
  };

  const handlePestSeverityChange = (event) => {
    setPestSeverity(event.target.value);
  };

  return (
    <div>
      {dataUri ? (
        <>
          <ImagePreview dataUri={dataUri} idealResolution={{ width: 920, height: 920 }} />
          <div>
            <FormControl sx={{ m: 1, minWidth: '80%' }}>
              <InputLabel>{t('PEST_TYPE')}</InputLabel>
              <Select value={pestType} label={t('PEST_TYPE')} onChange={handlePestTypeChange}>
                <MenuItem value={'Whiteflies'}>Whiteflies</MenuItem>
                <MenuItem value={'Thrips'}>Thrips</MenuItem>
                <MenuItem value={'Spidermites'}>Spidermites</MenuItem>
                <MenuItem value={'Aphids'}>Aphids</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
              <FormHelperText>{t('REQUIRED')}</FormHelperText>
            </FormControl>
          </div>
          {pestType === 'Others' && (
            <div>
              <TextField
                sx={{ m: 1, minWidth: '80%' }}
                id="outlined-basic"
                label={t('FILE_NAME')}
                className={classes.textField}
                variant="outlined"
                value={othersFileName}
                onChange={(event) => setOthersFileName(event.target.value)}
              />
            </div>
          )}
          {pestType !== 'Others' && (
            <>
              <div>
                <FormControl sx={{ m: 1, minWidth: '80%' }}>
                  <InputLabel>{t('NATURAL_ENEMIES')}</InputLabel>
                  <Select
                    value={naturalEnemy}
                    label={t('NATURAL_ENEMIES')}
                    onChange={handleNaturalEnemiesChange}>
                    <MenuItem value={'none'}>None</MenuItem>
                    <MenuItem value={'phytoseiulus'}>Phytoseiulus</MenuItem>
                    <MenuItem value={'macrolophus'}>Macrolophus</MenuItem>
                  </Select>
                  <FormHelperText>{t('REQUIRED')}</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: '80%' }} disabled={pestType === ''}>
                  <InputLabel>{t('PEST_STAGE')}</InputLabel>
                  <Select
                    value={pestStage}
                    label={t('PEST_STAGE')}
                    onChange={handlePestStageChange}>
                    <MenuItem value={'Adult'}>Adult</MenuItem>
                    <MenuItem value={'Mixed'}>Mixed</MenuItem>
                    {pestType === 'Thrips' ? (
                      <MenuItem value={'Larvae'}>Larvae</MenuItem>
                    ) : (
                      <MenuItem value={'Nymph'}>Nymph</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>{t('OPTIONAL')}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl
                  disabled={
                    pestType !== 'Whiteflies' &&
                    pestType !== 'Thrips' &&
                    pestType !== 'Spidermites' &&
                    pestType !== 'Aphids'
                  }
                  sx={{ m: 1, minWidth: '80%' }}>
                  <InputLabel>{t('PEST_SEVERITY')}</InputLabel>
                  <Select
                    value={pestSeverity}
                    label={t('PEST_SEVERITY')}
                    onChange={handlePestSeverityChange}>
                    {pestType === 'Whiteflies' && (
                      <MenuItem value={'High-More-Than-5'}>{'High (5 adults per leave)'}</MenuItem>
                    )}
                    {pestType === 'Whiteflies' && (
                      <MenuItem value={'Low-Less-Than-5'}>
                        {'Low (less than 5 adults per leave)'}
                      </MenuItem>
                    )}

                    {pestType === 'Thrips' && (
                      <MenuItem value={'High-More-Than-1.2'}>
                        {'High (1.2 adults per leave)'}
                      </MenuItem>
                    )}
                    {pestType === 'Thrips' && (
                      <MenuItem value={'Low-Less-Than-1.2'}>
                        {'Low (less than 1.2 adults per leave)'}
                      </MenuItem>
                    )}

                    {pestType === 'Spidermites' && (
                      <MenuItem value={'High-More-Than-2'}>{'High (2 adults per leave)'}</MenuItem>
                    )}
                    {pestType === 'Spidermites' && (
                      <MenuItem value={'Low-Less-Than-2'}>
                        {'Low (less than 2 adults per leave)'}
                      </MenuItem>
                    )}

                    {pestType === 'Aphids' && (
                      <MenuItem value={'High-Visible'}>{'High (When it appears)'}</MenuItem>
                    )}
                    {pestType === 'Aphids' && (
                      <MenuItem value={'Low-Invisible'}>{"Low (When it doesn't appears)"}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText>{t('OPTIONAL')}</FormHelperText>
                </FormControl>
              </div>
            </>
          )}
          <div className={classes.buttons}>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              justify="flex-end"
              onClick={submitDataHandler}
              className={classes.signInStyles}>
              {isLoading ? '' : t('SUBMIT')}
            </LoadingButton>

            <Button variant="contained" onClick={() => setDataUri('')}>
              {t('CANCEL')}
            </Button>
          </div>
        </>
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          idealResolution={{ width: 920, height: 920 }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
        />
      )}
    </div>
  );
}

export default PhotoCapture;

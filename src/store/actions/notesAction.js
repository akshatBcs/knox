import { notebookFileName, userStorage } from '../../components/Shared/defaults';
import { encryptObject, decryptToObject } from './crypt';

export const fetchNotebookFile = () => {
  return (dispatch) => {
    const options = { decrypt: true };
    userStorage.getFile(notebookFileName, options)
      .then((res) => {
        const notebookFileData = JSON.parse(res);
        //console.log(res)
        const decrypted = decryptToObject(notebookFileData);
        //console.log('Decrypted object:', decrypted);
        dispatch({
          type: 'NOTEBOOK_FILE_FETCH_SUCCESS',
          payload: decrypted
        });
      })
      .catch((err) => {
        console.debug(`Error while fetching ${notebookFileName}`);
        if (err.code === "does_not_exist") {
          console.debug(`Creating new ${notebookFileName}`);
          const newOptions = { encrypt: true };
          const initialNotebookData = {
            data: []
          };

          const ciphertext = encryptObject(initialNotebookData);
          //console.log('Ciphertext:', ciphertext);

          userStorage
            .putFile(notebookFileName, JSON.stringify(ciphertext), newOptions)
            .then(() => {
              dispatch({
                type: 'NOTEBOOK_FILE_FETCH_SUCCESS',
                payload: ciphertext.ciphertext
              })
            })
            .catch((err) => {
              console.debug(`Error while creating new ${notebookFileName}`, err);
            });
        } else {
          console.debug(err);
        }
      });
  };
};

export const postNotebookFile = (userSession, notebookData) => {
  return (dispatch) => {
    const options = { encrypt: true };
    const allNotesData = {
      data: notebookData
    };

    const ciphertext = encryptObject(allNotesData);
    //console.log('Ciphertext:', ciphertext);

    userStorage
      .putFile(notebookFileName, JSON.stringify(ciphertext), options)
      .then(() => {
        dispatch({
          type: 'NOTEBOOK_FILE_POST_SUCCESS',
          payload: ciphertext.ciphertext
        });
      })
      .catch((err) => {
        console.debug(`Error while pushing ${notebookFileName}`, err);
      });
  };
};
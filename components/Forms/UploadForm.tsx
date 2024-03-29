import { ActivityIndicator } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  useStoreDispatch,
  useStoreState,
  useStoreActions,
} from '../../store/module';
import RegularButton from '../Buttons/RegularButton';
import { storage } from '../../firebaseConfig';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { colors } from '../colors';
import ErrorMessage from '../Errors/ErrorMessage';

const UploadForm = (): ReactElement => {
  const state = useStoreState((state) => state);
  const setSelectedImage = useStoreActions(
    (actions) => actions.setSelectedImage
  );
  const setError = useStoreActions((actions) => actions.setImageUploadError);
  const selectedImage = state.selectedImage;
  const dispatch = useStoreDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    if (selectedImage !== '' && isImageSelected === true) {
      uploadImage();
    }
  }, [isImageSelected]);

  const openImagePicker = async () => {
    setIsLoading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const source = result.assets !== null ? result.assets[0].uri : '';
    setSelectedImage(source);
    setIsImageSelected(true);
  };

  const uploadImage = async () => {
    if (selectedImage !== null) {
      const blob: Blob | Uint8Array | ArrayBuffer = await new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', selectedImage, true);
          xhr.send(null);
        }
      );
      const filename = selectedImage.substring(
        selectedImage.lastIndexOf('/') + 1
      );
      const fileType = filename.split('.')[filename.split('.').length - 1];
      var storageRef = ref(storage, `images/${filename}`);
      const metadata = {
        contentType: `image/${fileType}`,
      };
      uploadBytes(storageRef, blob, metadata)
        .then((snapshot) => {
          setIsLoading(false);
          getUrl(filename);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError(true);
        });
    }
  };

  const getUrl = (filename: string) => {
    getDownloadURL(ref(storage, `images/${filename}`))
      .then((url) => {
        dispatch.getUploadedImageTags(url);
        setIsLoading(false);
        setIsImageSelected(false);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  };

  return (
    <>
      {state.imageUploadError && (
        <ErrorMessage>An error occured, try again.</ErrorMessage>
      )}
      <RegularButton
        disable={isLoading !== true ? false : true}
        textStyle={{}}
        onPress={openImagePicker}
      >
        {isLoading !== true ? (
          `Select an image`
        ) : (
          <ActivityIndicator size='large' color={colors.white} />
        )}
      </RegularButton>
    </>
  );
};

export default UploadForm;

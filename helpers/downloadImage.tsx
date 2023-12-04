import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';

export const downloadImage = (imageUrl: string) => {
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader App Storage Permission',
          message:
            'Downloader App needs access to your storage ' +
            'so you can download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          '/download_' +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          '.mp4',
        description: 'file download',
      },
    })
      .fetch('GET', pastedURL, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path());
        alert('file downloaded successfully ');
      });
  };
};

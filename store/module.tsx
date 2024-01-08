import {
  createStore,
  action,
  thunk,
  createTypedHooks,
  Thunk,
} from 'easy-peasy';
import { Action } from 'easy-peasy';
import axios from 'axios';
let base64 = require('base-64');

export interface TagObject {
  confidence: number;
  tag: { en: string };
}

export interface StoreModel {
  aiImageTags: TagObject[];
  setAiImageTags: Action<StoreModel, TagObject[]>;
  getAiImageTags: Thunk<StoreModel, string>;
  uploadedImageTags: TagObject[];
  setUploadedImageTags: Action<StoreModel, TagObject[]>;
  getUploadedImageTags: Thunk<StoreModel, string>;
  clickCounter: number;
  setClickCounter: Action<StoreModel, number>;
  timestamp: number | null;
  setTimestamp: Action<StoreModel, number>;
  aiImageUrl: string | null;
  setAiImageUrl: Action<StoreModel, string>;
  selectedImage: string | null;
  setSelectedImage: Action<StoreModel, string>;
  value: string;
  setValue: Action<StoreModel, string>;
  imageUploadError: boolean;
  setImageUploadError: Action<StoreModel, boolean>;
}

export const store = createStore<StoreModel>({
  aiImageTags: [],
  setAiImageTags: action((state, payload) => {
    state.aiImageTags = payload;
  }),
  getAiImageTags: thunk(async (actions, imageUrl) => {
    const apiKey = 'acc_d3b3db2709ecc58';
    const apiSecret = '8ec511604fd393114551997eb6c1465e';

    const url =
      `https://${apiKey}:${apiSecret}@api.imagga.com/v2/tags?image_url=` +
      encodeURIComponent(imageUrl);
    const auth = base64.encode(`${apiKey}:${apiSecret}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const tags = response.data?.result.tags;
    actions.setAiImageTags(tags);
  }),
  uploadedImageTags: [],
  setUploadedImageTags: action((state, payload) => {
    state.uploadedImageTags = payload;
  }),
  getUploadedImageTags: thunk(async (actions, imageUrl) => {
    const apiKey = 'acc_d3b3db2709ecc58';
    const apiSecret = '8ec511604fd393114551997eb6c1465e';

    const url =
      `https://${apiKey}:${apiSecret}@api.imagga.com/v2/tags?image_url=` +
      encodeURIComponent(imageUrl);
    const auth = base64.encode(`${apiKey}:${apiSecret}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const tags = response.data?.result.tags;
    actions.setUploadedImageTags(tags);
  }),
  clickCounter: 0,
  setClickCounter: action((state, payload) => {
    state.clickCounter = payload;
  }),
  timestamp: null,
  setTimestamp: action((state, payload) => {
    state.timestamp = payload;
  }),
  aiImageUrl: '',
  setAiImageUrl: action((state, payload) => {
    state.aiImageUrl = payload;
  }),
  selectedImage: '',
  setSelectedImage: action((state, payload) => {
    state.selectedImage = payload;
  }),
  value: 'ai',
  setValue: action((state, payload) => {
    state.value = payload;
  }),
  imageUploadError: false,
  setImageUploadError: action((state, payload) => {
    state.imageUploadError = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

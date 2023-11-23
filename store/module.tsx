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
  tags: TagObject[];
  setTags: Action<StoreModel, TagObject[]>;
  getTags: Thunk<StoreModel, string>;
  clickCounter: number;
  setClickCounter: Action<StoreModel, number>;
  timestamp: number | null;
  setTimestamp: Action<StoreModel, number>;
  selectedImage: string | null;
  setSelectedImage: Action<StoreModel, string>;
}

export const store = createStore<StoreModel>({
  tags: [],
  setTags: action((state, payload) => {
    state.tags = payload;
  }),
  getTags: thunk(async (actions, imageUrl) => {
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
    actions.setTags(tags);
  }),
  clickCounter: 0,
  setClickCounter: action((state, payload) => {
    state.clickCounter = payload;
  }),
  timestamp: null,
  setTimestamp: action((state, payload) => {
    state.timestamp = payload;
  }),
  selectedImage: '',
  setSelectedImage: action((state, payload) => {
    state.selectedImage = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

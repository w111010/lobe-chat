import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../middleware/createDevtools';
import { AIProviderStoreState, initialState } from './initialState';
import { AiProviderAction, createCrudSlice } from './slices/aiProvider';

//  ===============  聚合 createStoreFn ============ //

export interface AiInfraStore extends AIProviderStoreState, AiProviderAction {
  // empty
}

const createStore: StateCreator<AiInfraStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createCrudSlice(...parameters),
});

//  ===============  实装 useStore ============ //
const devtools = createDevtools('aiInfra');

export const useAiInfraStore = createWithEqualityFn<AiInfraStore>()(devtools(createStore), shallow);

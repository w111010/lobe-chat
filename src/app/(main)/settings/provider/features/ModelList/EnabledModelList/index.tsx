import isEqual from 'fast-deep-equal';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import ModelItem from '../ModelItem';

const EnabledModelList = ({ id, showAzureDeployName }) => {
  const chatModelCards = useUserStore(modelProviderSelectors.getModelCardsById(id), isEqual);

  const defaultEnableModel = useUserStore(
    modelProviderSelectors.getDefaultEnabledModelsById(id),
    isEqual,
  );
  const enabledModels = useUserStore(modelProviderSelectors.getEnableModelsById(id), isEqual);

  return (
    <Flexbox gap={2}>
      {chatModelCards
        .filter((i) => enabledModels?.includes(i.id))
        .map(({ displayName, id, pricing, releasedAt }) => {
          const label = displayName || id;

          return (
            <ModelItem
              displayName={label as string}
              id={id as string}
              isAzure={showAzureDeployName}
              key={id}
              pricing={pricing}
              provider={id}
              sortable
              releasedAt={releasedAt}
              // removed={enabledModels?.some((m) => id === m)}
            />
          );
        })}
    </Flexbox>
  );
};
export default EnabledModelList;

'use client';

import { Typography } from 'antd';
import isEqual from 'fast-deep-equal';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { aiProviderSelectors } from '@/store/aiInfra';
import { useAiInfraStore } from '@/store/aiInfra/store';

import All from './All';
import ProviderItem from './Item';

const ProviderList = () => {
  const { t } = useTranslation('modelProvider');

  const enabledModelProviderList = useAiInfraStore(
    aiProviderSelectors.enabledAiProviderList,
    isEqual,
  );

  const disabledModelProviderList = useAiInfraStore(
    aiProviderSelectors.disabledAiProviderList,
    isEqual,
  );

  return (
    <Flexbox gap={4} padding={'0 12px'}>
      <All />
      <Typography.Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
        {t('menu.list.enabled')}
      </Typography.Text>
      {enabledModelProviderList.map((item) => (
        <ProviderItem {...item} key={item.id} />
      ))}
      <Typography.Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
        {t('menu.list.disabled')}
      </Typography.Text>
      {disabledModelProviderList.map((item) => (
        <ProviderItem {...item} key={item.id} />
      ))}
    </Flexbox>
  );
};

export default ProviderList;

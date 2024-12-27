import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Statistic from '@/components/Statistic';
import StatisticCard from '@/components/StatisticCard';
import TitleWithPercentage from '@/components/StatisticCard/TitleWithPercentage';
import { useClientDataSWR } from '@/libs/swr';
import { messageService } from '@/services/message';
import { formatIntergerNumber } from '@/utils/format';
import { lastMonth } from '@/utils/time';

const TotalMessages = memo(() => {
  const { t } = useTranslation('auth');

  const { data, isLoading } = useClientDataSWR('stats-messages', async () => ({
    count: await messageService.countMessages(),
    prevCount: await messageService.countMessages({ endDate: lastMonth().format('YYYY-MM-DD') }),
  }));

  return (
    <StatisticCard
      loading={isLoading || !data}
      statistic={{
        description: (
          <Statistic
            title={t('date.prevMonth')}
            value={formatIntergerNumber(data?.prevCount) || '--'}
          />
        ),
        precision: 0,
        value: data?.count || '--',
      }}
      title={
        <TitleWithPercentage
          count={data?.count}
          prvCount={data?.prevCount}
          title={t('stats.messages')}
        />
      }
    />
  );
});

export default TotalMessages;

import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { DiscoverService } from '@/server/services/discover';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import List from './features/List';

type Props = { searchParams: { hl?: Locales } };

export const generateMetadata = async ({ searchParams }: Props) => {
  const { t } = await translation('metadata', searchParams?.hl);

  return metadataModule.generate({
    description: t('discover.plugins.description'),
    title: t('discover.plugins.title'),
    url: '/discover/plugins',
  });
};

const Page = async ({ searchParams }: Props) => {
  const { t, locale } = await translation('metadata', searchParams?.hl);
  const mobile = isMobileDevice();

  const discoverService = new DiscoverService();
  const items = await discoverService.getPluginList(locale);

  const ld = ldModule.generate({
    description: t('discover.plugins.description'),
    title: t('discover.plugins.title'),
    url: '/discover/plugins',
    webpage: {
      enable: true,
      search: true,
    },
  });

  return (
    <>
      <StructuredData ld={ld} />
      <List items={items} mobile={mobile} />
    </>
  );
};

Page.DisplayName = 'DiscoverTools';

export default Page;
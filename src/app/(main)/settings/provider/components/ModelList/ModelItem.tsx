import { ModelIcon } from '@lobehub/icons';
import { ActionIcon, Icon, Tag, Tooltip, copyToClipboard } from '@lobehub/ui';
import { Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { GripVertical, LucideSettings, Recycle } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelInfoTags } from '@/components/ModelSelect';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';
import { oneLineEllipsis } from '@/styles';
import { ModelPricing } from '@/types/llm';

export const useStyles = createStyles(({ css, token, cx }) => {
  const grip = css`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: ${token.colorTextSecondary};
    transition: all 200ms ease-in-out;
    opacity: 0;
  `;

  return {
    container: css`
      border-radius: 12px;

      transition: all 200ms ease-in-out;

      &:hover {
        background-color: ${token.colorFillTertiary};

        .${cx(grip)} {
          opacity: 1;
        }
      }

      position: relative;
    `,
    desc: css`
      flex: 1;
      min-width: 0;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
    grip,
  };
});

interface OptionRenderProps {
  displayName: string;
  id: string;
  isAzure?: boolean;
  pricing?: ModelPricing;
  provider: string;
  releasedAt?: string;
  removed?: boolean;
  sortable?: boolean;
}

const OptionRender = memo<OptionRenderProps>(
  ({ displayName, id, provider, isAzure, removed, sortable, releasedAt, pricing }) => {
    const { styles, cx } = useStyles();
    const model = useUserStore((s) => modelProviderSelectors.getModelCardById(id)(s), isEqual);
    const { t } = useTranslation(['components', 'setting', 'models']);
    const theme = useTheme();
    // // if there is isCustom, it means it is a user defined custom model
    // if (model?.isCustom || isAzure) return <CustomModelOption id={id} provider={provider} />;

    const content = [
      releasedAt && `发布于${releasedAt}`,
      typeof pricing?.input !== 'undefined' ? `输入 $${pricing?.input} /M` : undefined,
      typeof pricing?.output !== 'undefined' ? `输出 $${pricing?.output} /M` : undefined,
    ].filter(Boolean) as string[];
    return (
      <Flexbox
        align={'center'}
        className={styles.container}
        gap={24}
        horizontal
        justify={'space-between'}
        padding={12}
        width={'100%'}
      >
        <Flexbox align={'center'} flex={1} gap={8} horizontal style={{ minWidth: 0 }}>
          {sortable && <Icon className={styles.grip} icon={GripVertical} size={{ fontSize: 12 }} />}
          <ModelIcon model={id} size={32} />
          <Flexbox flex={1} gap={4} style={{ minWidth: 0 }}>
            <Flexbox align={'center'} gap={8} horizontal>
              {displayName}
              <Tag
                onClick={() => {
                  copyToClipboard(id);
                }}
                style={{ cursor: 'pointer', marginRight: 0 }}
              >
                {id}
              </Tag>
            </Flexbox>
            <Flexbox align={'baseline'} gap={8} horizontal>
              {content.length > 0 && (
                <>
                  <Typography.Text
                    style={{ color: theme.colorTextSecondary, fontSize: 12, marginBottom: 0 }}
                  >
                    {content.join(' · ')}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 12, marginBottom: 0 }} type={'secondary'}>
                    |
                  </Typography.Text>
                </>
              )}
              <span className={styles.desc}>
                <Typography.Text
                  className={oneLineEllipsis}
                  ellipsis={{ tooltip: true }}
                  style={{ fontSize: 12, marginBottom: 0 }}
                  type={'secondary'}
                >
                  {t(`${id}.description`, { defaultValue: id, ns: 'models' })}
                </Typography.Text>
              </span>
            </Flexbox>
          </Flexbox>
        </Flexbox>
        <Flexbox align={'center'} gap={8} horizontal>
          <ModelInfoTags placement={'top'} {...model!} />
          <ActionIcon
            icon={LucideSettings}
            onClick={async (e) => {
              e.stopPropagation();
              // toggleEditingCustomModelCard({ id, provider });
            }}
            title={t('llm.customModelCards.config', { ns: 'setting' })}
          />
          {removed && (
            <Tooltip
              overlayStyle={{ maxWidth: 300 }}
              placement={'top'}
              style={{ pointerEvents: 'none' }}
              title={t('ModelSelect.removed')}
            >
              <ActionIcon icon={Recycle} style={{ color: theme.colorWarning }} />
            </Tooltip>
          )}
        </Flexbox>
      </Flexbox>
    );
  },
);

export default OptionRender;

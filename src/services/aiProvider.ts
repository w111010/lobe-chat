import { lambdaClient } from '@/libs/trpc/client';
import { AiProviderSortMap, CreateAiProviderParams } from '@/types/aiProvider';

class AiProviderService {
  createAiProvider = async (params: CreateAiProviderParams) => {
    return lambdaClient.aiProvider.createAiProvider.mutate(params);
  };

  getAiProviderList = async () => {
    return lambdaClient.aiProvider.getAiProviderList.query();
  };

  getAiProviderById = async (id: string) => {
    return lambdaClient.aiProvider.getAiProviderById.query({ id });
  };

  toggleProviderEnabled = async (id: string, enabled: boolean) => {
    return lambdaClient.aiProvider.toggleProviderEnabled.mutate({ enabled, id });
  };

  updateAiProvider = async (id: string, value: any) => {
    return lambdaClient.aiProvider.updateAiProvider.mutate({ id, value });
  };

  updateAiProviderOrder = async (items: AiProviderSortMap[]) => {
    return lambdaClient.aiProvider.updateAiProviderOrder.mutate({ sortMap: items });
  };

  deleteAiProvider = async (id: string) => {
    return lambdaClient.aiProvider.removeAiProvider.mutate({ id });
  };
}

export const aiProviderService = new AiProviderService();

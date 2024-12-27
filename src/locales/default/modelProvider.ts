export default {
  azure: {
    azureApiVersion: {
      desc: 'Azure 的 API 版本，遵循 YYYY-MM-DD 格式，查阅[最新版本](https://learn.microsoft.com/zh-cn/azure/ai-services/openai/reference#chat-completions)',
      fetch: '获取列表',
      title: 'Azure API Version',
    },
    empty: '请输入模型 ID 添加第一个模型',
    endpoint: {
      desc: '从 Azure 门户检查资源时，可在“密钥和终结点”部分中找到此值',
      placeholder: 'https://docs-test-001.openai.azure.com',
      title: 'Azure API 地址',
    },
    modelListPlaceholder: '请选择或添加你部署的 OpenAI 模型',
    title: 'Azure OpenAI',
    token: {
      desc: '从 Azure 门户检查资源时，可在“密钥和终结点”部分中找到此值。 可以使用 KEY1 或 KEY2',
      placeholder: 'Azure API Key',
      title: 'API Key',
    },
  },
  bedrock: {
    accessKeyId: {
      desc: '填入 AWS Access Key Id',
      placeholder: 'AWS Access Key Id',
      title: 'AWS Access Key Id',
    },
    checker: {
      desc: '测试 AccessKeyId / SecretAccessKey 是否填写正确',
    },
    region: {
      desc: '填入 AWS Region',
      placeholder: 'AWS Region',
      title: 'AWS Region',
    },
    secretAccessKey: {
      desc: '填入 AWS Secret Access Key',
      placeholder: 'AWS Secret Access Key',
      title: 'AWS Secret Access Key',
    },
    sessionToken: {
      desc: '如果你正在使用 AWS SSO/STS，请输入你的 AWS Session Token',
      placeholder: 'AWS Session Token',
      title: 'AWS Session Token (可选)',
    },
    title: 'Bedrock',
    unlock: {
      customRegion: '自定义服务区域',
      customSessionToken: '自定义 Session Token',
      description:
        '输入你的 AWS AccessKeyId / SecretAccessKey 即可开始会话。应用不会记录你的鉴权配置',
      title: '使用自定义 Bedrock 鉴权信息',
    },
  },
  cloudflare: {
    apiKey: {
      desc: '请填写 Cloudflare API Key',
      placeholder: 'Cloudflare API Key',
      title: 'Cloudflare API Key',
    },
    baseURLOrAccountID: {
      desc: '填入 Cloudflare 账户 ID 或 自定义 API 地址',
      placeholder: 'Cloudflare Account ID / custom API URL',
      title: 'Cloudflare 账户 ID / API 地址',
    },
  },
  createNewAiProvider: {
    apiKey: {
      placeholder: '请填写你的 API Key',
      required: '请填写你的 API Key',
      title: 'API Key',
    },
    basicTitle: '基本信息',
    configTitle: '配置信息',
    confirm: '新建',
    createSuccess: '新建成功',
    description: {
      placeholder: '服务商简介（选填）',
      title: '服务商简介',
    },
    id: {
      placeholder: '建议全小写，例如 openai',
      required: '请填写服务商 ID',
      title: '服务商唯一 ID',
    },
    logo: {
      required: '请上传正确的服务商 Logo',
      title: '服务商 Logo',
    },
    name: {
      placeholder: '请输入服务商的展示名称',
      required: '请填写服务商名称',
      title: '服务商名称',
    },
    proxyUrl: {
      placeholder: '请填写你的请求地址，如果不填则会使用 SDK 对应的请求地址',
      title: '代理地址',
    },
    sdkType: {
      required: '请选择 SDK 类型',
      title: '请求格式',
    },
    title: '创建自定义 AI 服务商',
  },
  github: {
    personalAccessToken: {
      desc: '填入你的 Github PAT，点击 [这里](https://github.com/settings/tokens) 创建',
      placeholder: 'ghp_xxxxxx',
      title: 'Github PAT',
    },
  },
  huggingface: {
    accessToken: {
      desc: '填入你的 HuggingFace Token，点击 [这里](https://huggingface.co/settings/tokens) 创建',
      placeholder: 'hf_xxxxxxxxx',
      title: 'HuggingFace Token',
    },
  },
  list: {
    title: {
      disabled: '未启用服务商',
      enabled: '已启用服务商',
    },
  },
  menu: {
    addCustomProvider: '添加自定义服务商',
    all: '全部',
    list: {
      disabled: '未启用',
      enabled: '已启用',
    },
    notFound: '未找到搜索结果',
    searchProviders: '搜索服务商...',
    sort: '自定义排序',
  },
  ollama: {
    checker: {
      desc: '测试代理地址是否正确填写',
      title: '连通性检查',
    },
    customModelName: {
      desc: '增加自定义模型，多个模型使用逗号（,）隔开',
      placeholder: 'vicuna,llava,codellama,llama2:13b-text',
      title: '自定义模型名称',
    },
    download: {
      desc: 'Ollama 正在下载该模型，请尽量不要关闭本页面。重新下载时将会中断处继续',
      remainingTime: '剩余时间',
      speed: '下载速度',
      title: '正在下载模型 {{model}} ',
    },
    endpoint: {
      desc: '填入 Ollama 接口代理地址，本地未额外指定可留空',
      title: 'Ollama 服务地址',
    },
    setup: {
      cors: {
        description: '因浏览器安全限制，你需要为 Ollama 进行跨域配置后方可正常使用。',
        linux: {
          env: '在 [Service] 部分下添加 `Environment`，添加 OLLAMA_ORIGINS 环境变量：',
          reboot: '重载 systemd 并重启 Ollama',
          systemd: '调用 systemd 编辑 ollama 服务：',
        },
        macos: '请打开「终端」应用程序，并粘贴以下指令，并按回车运行',
        reboot: '请在执行完成后重启 Ollama 服务',
        title: '配置 Ollama 允许跨域访问',
        windows:
          '在 Windows 上，点击「控制面板」，进入编辑系统环境变量。为您的用户账户新建名为 「OLLAMA_ORIGINS」 的环境变量，值为 * ，点击 「OK/应用」 保存',
      },
      install: {
        description: '请确认你已经开启 Ollama ，如果没有下载 Ollama ，请前往官网<1>下载</1>',
        docker:
          '如果你更倾向于使用 Docker，Ollama 也提供了官方 Docker 镜像，你可以通过以下命令拉取：',
        linux: {
          command: '通过以下命令安装：',
          manual: '或者，你也可以参考 <1>Linux 手动安装指南</1> 自行安装',
        },
        title: '在本地安装并开启 Ollama 应用',
        windowsTab: 'Windows (预览版)',
      },
    },
    title: 'Ollama',
    unlock: {
      cancel: '取消下载',
      confirm: '下载',
      description: '输入你的 Ollama 模型标签，完成即可继续会话',
      downloaded: '{{completed}} / {{total}}',
      starting: '开始下载...',
      title: '下载指定的 Ollama 模型',
    },
  },
  sortModal: {
    success: '排序更新成功',
    title: '自定义排序',
    update: '更新',
  },
  wenxin: {
    accessKey: {
      desc: '填入百度千帆平台的 Access Key',
      placeholder: 'Qianfan Access Key',
      title: 'Access Key',
    },
    checker: {
      desc: '测试 AccessKey / SecretAccess 是否填写正确',
    },
    secretKey: {
      desc: '填入百度千帆平台 Secret Key',
      placeholder: 'Qianfan Secret Key',
      title: 'Secret Key',
    },
    unlock: {
      customRegion: '自定义服务区域',
      description: '输入你的 AccessKey / SecretKey 即可开始会话。应用不会记录你的鉴权配置',
      title: '使用自定义文心一言鉴权信息',
    },
  },
  zeroone: {
    title: '01.AI 零一万物',
  },
  zhipu: {
    title: '智谱',
  },
};

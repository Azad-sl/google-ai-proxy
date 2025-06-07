# Cloudflare Workers 反向代理 Google AI API 

## 步骤一：登录 Cloudflare

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录你的账号

## 步骤二：创建 Worker

1. 在左侧菜单找到并点击 **"Workers and Pages"**
2. 点击 **"Create application"** 按钮
3. 选择 **"Create Worker"**
4. 给你的 Worker 起个名字，比如：`google-ai-proxy`
5. 点击 **"Deploy"** 按钮

## 步骤三：编辑 Worker 代码

1. 部署完成后，点击 **"Edit code"** 按钮
2. 删除默认的所有代码
3. 复制粘贴 **google-ai-proxy.js** 里面所有的代码。

4. 点击右上角的 **"Save and deploy"** 按钮

## 步骤四：获取 Worker 地址

部署成功后，你会看到类似这样的地址：
```
https://google-ai-proxy.你的用户名.workers.dev
```

**这个地址就是你的代理地址**

## 步骤五：添加自定义域名

1. 在 Worker 详情页面，点击 **"Settings"** 标签
2. 向下滚动找到 **"Triggers"** 部分
3. 在 **"Custom Domains"** 区域，点击 **"Add Custom Domain"**
4. 输入你的自定义域名：`xxx.example.com`
5. 点击 **"Add Custom Domain"**
6. 等待生效

- DNS 记录会自动创建
- SSL 证书会自动申请
- 通常 2-5 分钟内生效

## 步骤六：测试 API 访问

**1. 浏览器测试** 在浏览器访问：

```
https://xxx.example.com/v1/models
```

如果返回：
```
{
    "error": {
        "code": 403,
        "message": "Method doesn't allow unregistered callers (callers without established identity). Please use API Key or other form of API consumer identity to call this API.",
        "status": "PERMISSION_DENIED"
    }
}
```

说明成功了。是时候去 [Google AI Studio](https://makersuite.google.com/app/apikey)申请你的API key了。

**2. curl 命令测试**

```bash
curl -I "https://xxx.example.com/v1/models"
```

**3. 完整 API 测试**

```bash
curl "https://xxx.example.com/v1/models?key=你的API密钥"
```



## 在代码中使用

**Python 示例：**

```python
import requests

# 使用自定义域名
base_url = "https://xxx.example.com"
api_key = "你的API密钥"

url = f"{base_url}/v1/models/gemini-pro:generateContent?key={api_key}"

data = {
    "contents": [{
        "parts": [{"text": "你好，请介绍一下自己"}]
    }]
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

**JavaScript 示例：**

```javascript
const baseUrl = "https://xxx.example.com";
const apiKey = "你的API密钥";

const url = `${baseUrl}/v1/models/gemini-pro:generateContent?key=${apiKey}`;

const data = {
    contents: [{
        parts: [{ text: "你好，请介绍一下自己" }]
    }]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```


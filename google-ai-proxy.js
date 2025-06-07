// Google AI API 反向代理
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取请求的 URL
  const url = new URL(request.url)
  
  // 构建目标 URL
  const targetUrl = `https://generativelanguage.googleapis.com${url.pathname}${url.search}`
  
  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      }
    })
  }
  
  // 创建新的请求头
  const newHeaders = new Headers(request.headers)
  newHeaders.set('Host', 'generativelanguage.googleapis.com')
  newHeaders.set('Origin', 'https://generativelanguage.googleapis.com')
  newHeaders.set('Referer', 'https://generativelanguage.googleapis.com/')
  
  try {
    // 创建新请求
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body
    })
    
    // 发送请求到 Google API
    const response = await fetch(newRequest)
    
    // 创建新的响应
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    })
    
    // 添加 CORS 头
    newResponse.headers.set('Access-Control-Allow-Origin', '*')
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    
    return newResponse
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Proxy request failed',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

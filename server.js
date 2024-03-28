import http from 'http'
import path from 'path'
// import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import handleAPI from './serverAPI.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// 得到的是运行目录，并不是该文件的所在目录
const __dirname = path.resolve()

// 'csrf_session_id=bf92236372ac2a61bbe062d9f5815cc4; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227351005395907118630%2522%252C%2522user_unique_id%2522%253A%25227351005395907118630%2522%252C%2522timestamp%2522%253A1711539328971%257D; passport_csrf_token=cc0752151219e3ad011fa9333f4c77f2; passport_csrf_token_default=cc0752151219e3ad011fa9333f4c77f2; n_mh=_NLTgZ-vi-xA3QdMd-A0IZWfvTg75OQIcrGBPQnBhro; sid_guard=09e573f5f91d706eec11f8113946c6cf%7C1711539347%7C31536000%7CThu%2C+27-Mar-2025+11%3A35%3A47+GMT; uid_tt=61f5896050425a362ca29fcaa129bf6c; uid_tt_ss=61f5896050425a362ca29fcaa129bf6c; sid_tt=09e573f5f91d706eec11f8113946c6cf; sessionid=09e573f5f91d706eec11f8113946c6cf; sessionid_ss=09e573f5f91d706eec11f8113946c6cf; sid_ucp_v1=1.0.0-KGYzNzRhOGNmYzVhMGJjNjI5YTIzZTY2Y2I5YjZmNWE1ZDdjOTI5OGUKFwjHsaHMk4zVBhCTiZCwBhiwFDgHQPQHGgJsZiIgMDllNTczZjVmOTFkNzA2ZWVjMTFmODExMzk0NmM2Y2Y; ssid_ucp_v1=1.0.0-KGYzNzRhOGNmYzVhMGJjNjI5YTIzZTY2Y2I5YjZmNWE1ZDdjOTI5OGUKFwjHsaHMk4zVBhCTiZCwBhiwFDgHQPQHGgJsZiIgMDllNTczZjVmOTFkNzA2ZWVjMTFmODExMzk0NmM2Y2Y; store-region=cn-sc; store-region-src=uid; msToken=9SavHQNqP9b8WuDGoTTrlEowA8AkkPvnsCd8k_qV530skEoZu64kxjuEhNthooLpvf6l54fso1i5v85EYpKVTUi8q06ldW2QW3w3eKuJy1ybfYddwkD2cUv6rzfcrQ=='

http.createServer(async (req, res) => {
    const { url } = req
    console.log(`当前请求接口: ${url}----------------------------------------`)
    if (url.endsWith('.css')) {
        const data = await readFile(`${__dirname}/public${url}`)
        res.end(data || '404')
    } else if (url.endsWith('.js')) {
        const data = await readFile(`${__dirname}/public${url}`)
        res.end(data || '404')
    } else if (url.startsWith('/api')) {
        const data = await handleAPI(req)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data || JSON.stringify({ code: 404, msg: '404' }))
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        const data = await readFile(`${__dirname}/public/index.html`)
        res.end(data || '404')
    }
    // Todo:   /favicon.ico
}).listen(3000)

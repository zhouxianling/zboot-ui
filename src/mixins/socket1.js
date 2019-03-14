var websocket = null;
// import { socketBaseUrl } from '@/utils/url'
// import { getToken } from '@/utils/auth'
export default{
    data(){
        return {
            msgData: null
        }
    },
    methods: {
        initSocket(url){
            // let url = `${socketBaseUrl}/${path}?token=${getToken()}`
            //判断当前浏览器是否支持WebSocket
            if ('WebSocket' in window) {
                websocket = new WebSocket(url);
            }
            else {
                alert('当前浏览器 Not support websocket')
            }

            //连接发生错误的回调方法
            websocket.onerror = () => {
                console.log("WebSocket连接发生错误");
            };

            //连接成功建立的回调方法
            websocket.onopen = () => {
                console.log("WebSocket连接成功");
            }

            //接收到消息的回调方法
            websocket.onmessage = (event) => {
                this.handleMessage(event.data)
            }

            //连接关闭的回调方法
            websocket.onclose = () => {
                console.log("WebSocket连接关闭");
            }

            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = () => {
                this.closeWebSocket();
            }
        },
        //关闭WebSocket连接
        closeWebSocket() {
            websocket.close();
        },
        //发送消息
        sendMsg(msg) {
            websocket.send(msg);
        },
        // 接受到消息处理
        handleMessage(data) {
            this.msgData = data;
        },
    }
}
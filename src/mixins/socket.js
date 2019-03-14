import { socketBaseUrl } from '@/utils/url'
import { getToken } from '@/utils/auth'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

var connectionPool = new Map();

export default {
    data(){
        return {
            url: `${socketBaseUrl}/endpoint?token=${getToken()}`
        }
    },
    methods: {
        initSocket(topicName, payload){
            // 建立连接对象
            let socket = new SockJS(this.url);// 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
            // 获取STOMP子协议的客户端对象
            let stompClient = Stomp.over(socket);
            // 创建Connection对象
            if(connectionPool.get(topicName)){
                connectionPool.get(topicName).sendMsg(payload)
            }else{
                connectionPool.set(topicName, new Connection(stompClient, topicName, this, payload));
            }

			// 断开重连机制,尝试发送消息,捕获异常发生时重连
			// let self = this;
			// this.timer = setInterval(() => {
			// 	try {
			// 		stompClient.send(topicName);
			// 	} catch (err) {
			// 		console.log("断线了: " + err);
            //         self.connection(topicName);
			// 	}
			// }, 5000);
        }
	},
	beforeDestroy() {
        clearInterval(this.timer);
        // 页面离开时断开连接,清除定时器
        for(let con of connectionPool.values()){
            con.disconnect();
        }  
	}
}

class Connection {
    constructor(stompClient, topicName, vm, payload) {
        this.stompClient = stompClient;
        this.topicName = topicName;
        this.payload = payload;
        this.vm = vm;
        this.headers = {};
        this.connect();
    }
    connect(vm) {
        // 向服务器发起websocket连接
        this.stompClient.connect(this.headers, 
            (frame) => {
               this.sendMsg(this.payload);
               this.receiveMsg();
            },
            (err) => {
                console.log(err);
            });
    }
    sendMsg(payload){
        // 如果存在负载，send负载， 负载必须为字符串
        if(payload){
            this.stompClient.send(`/${this.topicName}/request`, this.headers, payload)
        }
    }
    receiveMsg(){
        // 订阅服务端提供的某个topic
        this.stompClient.subscribe(`/topic/${this.topicName}`, (msg) => {
            // 存储消息
            // msg.body存放的是服务端发送给我们的信息
            this.vm[this.topicName] = msg.body; 
            // 调用处理消息处理函数
            this.vm[this.topicName + 'Socket'](msg.body);
        });
    }
    disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
            console.log("Disconnected--->" + this.topicName);
        }
    }
}

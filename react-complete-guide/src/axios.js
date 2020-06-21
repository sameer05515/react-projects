import axios from 'axios';

const topicMgmtInstance=axios.create({
    baseURL:'http://127.0.0.1:8080/RestServices/rest/'
});

//topicMgmtInstance.defaults.headers.common['Access-Control-Allow-Origin']='*';

export default topicMgmtInstance;
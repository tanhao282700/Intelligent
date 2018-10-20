<script>
  import axios from 'axios';

  axios.defaults.timeout = 10000;

  /*axios.defaults.baseURL = 'https://tesing.china-tillage.com';
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['access-control-allow-origin'] = '*';
  axios.defaults.headers.common['Authorization'] = 'password_projectid_userid';*/

  export default {
    name:'base'
  }
</script>


import axios from 'axios' ;

const  utils = {
        base :'/api',
        post:(url, params,tempA='101_101_101') => { //因为暂时没做登录，现在先做个临时header
            //params.Authorization = '101_101_101';//密码、项目id、用户id
            params.Authorization = tempA;
            return new Promise((resolve,reject)=>{
                axios.post(`${utils.base}/${url}`,params).then(res=>{
                    let data = res.data;
                    resolve(data);
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        time(dates = (new Date())/1000,type=1){
            let res = '';
            const date = new Date(dates*1000);//如果date为13位不需要乘1000
            const Y = date.getFullYear();
            const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
            const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            const m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
            const s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());

            const date0 = new Date();//如果date为13位不需要乘1000
            const Y0 = date0.getFullYear();
            const M0 = (date0.getMonth()+1 < 10 ? '0'+(date0.getMonth()+1) : date0.getMonth()+1);
            const D0 = (date0.getDate() < 10 ? '0' + (date0.getDate()) : date0.getDate());
            const h0 = (date0.getHours() < 10 ? '0' + date0.getHours() : date0.getHours());
            const m0 = (date0.getMinutes() <10 ? '0' + date0.getMinutes() : date0.getMinutes());
            const s0 = (date0.getSeconds() <10 ? '0' + date0.getSeconds() : date0.getSeconds());

            switch(type){
                case 1:
                    res = Y+'-'+M+'-'+D;
                break;
                case 2:
                    res = M+'-'+D+' '+h+':'+m;
                break;
                case 3:
                    res = Y+'-'+M+'-'+D+' '+h+':'+m;
                break;
                case 4:
                    res = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
                break;
                case 5:
                res = M+'月'+D+'日';
                break;
                case 6:
                res =Y+'年'+ M+'月'+D+'日';
                break;
                case 7:
                    if(Y==Y0 &&M==M0 &&D==D0){
                        res ='今天'+' '+h+':'+m;
                    }else{
                        res = Y+'-'+M+'-'+D+' '+h+':'+m;
                    }
                break;
                case 8:
                res =Y+':'+ M+':'+D;
                break;
                case 9:
                res =Y+'-'+ M;
                break;
            }
            return res;
        },
        time2:function(attrs){   //转化为时间戳
            let dates = new Date();  //new Date(str)//移动端实测，bug
            dates.setFullYear(attrs[0]);
            dates.setMonth(attrs[1]);
            dates.setDate(attrs[2]);
            if(attrs[3]!==undefined){
              dates.setHours(hour);
            }
            if(attrs[4]!==undefined){
                dates.setMinutes(pickedValue[5]);
              }
            let time1 = Date.parse(dates)/1000;
            return time1;
        },
        time3:function(datesss){   //转化为时间戳 标准格式 ：2018-07-13 12:12:12
            let timeAttrs= [];
            let time1 = datesss.split(' ')[0];
            let time2 = datesss.split(' ')[1];
            timeAttrs.push(time1.split('-')[0]);
            timeAttrs.push(Number(time1.split('-')[1])-1);
            timeAttrs.push(time1.split('-')[2]);
            timeAttrs.push(time2.split(':')[0]);
            timeAttrs.push(time2.split(':')[1]);
            timeAttrs.push(time2.split(':')[2]);

            let dates = new Date();  //new Date(str)//移动端实测，bug
            dates.setFullYear(timeAttrs[0]);
            dates.setMonth(timeAttrs[1]);
            dates.setDate(timeAttrs[2]);
            dates.setHours(timeAttrs[3]);
            dates.setMinutes(timeAttrs[4]);
            dates.setSeconds(timeAttrs[5]);
            let timess = Date.parse(dates)/1000;
            return timess;
        },
        wid(num){  //计算宽度（用于某些插件需要px）
            let res = num;
            let wids = document.documentElement.clientWidth;
            res = num/1366*Number(wids);
            return res;
        },
        hei(num){  //计算高度（用于某些插件需要px）
            let res = num;
            let hei = document.documentElement.clientHeight;
            res = num/728*Number(hei);
            return res;
        },
        timeDeal(time){   //选择时间处理······  老处理方法，找个时间重构
            let res = '';
            res = time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日';
            return res;
          }
    };

export default utils;


let schedule = require('node-schedule')
import {job as employeeCountJob} from './job/employeeCountJob'
import { LOGGER } from "../common/utils/logUtil";

let scheduleCenter = {
    start() : void {        

        //定时任务1，固定的时刻执行一次
        var date = new Date(2019, 10, 20, 23, 2, 40); //2019-11-20 23:02:40
        let job1 = schedule.scheduleJob(date, () => {
            LOGGER.info('job1');
        });

        //定时任务2，每天晚上23:00固定时间执行
        let job2_cron = '0 0 23 * * *';
        let job2 = schedule.scheduleJob(job2_cron, () => {
            LOGGER.info('job2');
        });

        //定时任务3，程序启动后10秒执行第一次，然后每隔30秒执行一次
        let startTime = new Date(Date.now() + 10*1000);
        let job3 = schedule.scheduleJob({ start: startTime, rule: '*/30 * * * * *' }, employeeCountJob.run);
    }
};

export {scheduleCenter}
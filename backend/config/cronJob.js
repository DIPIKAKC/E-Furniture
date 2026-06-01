import cron from 'node-cron';

// * => sec, min, hr, day of month, month, day of week
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
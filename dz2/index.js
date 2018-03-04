const yargs = require('yargs');
const http = require('http');

const argv = yargs
  .usage('command [options]')
  .help('h')
  .alias('h', 'help')
  .version('v', 'version', '0.0.1')
  .alias('v', 'version')
  .demand('t')
  .nargs('t', 1)
  .describe('t', 'time session, sec')
  .alias('t', 'time')
  .default('t', '10')
  .demand('i')
  .describe('i', 'interval message to console terminal, sec')
  .alias('i', 'interval')
  .default('i', '2')
  .argv;

const time = Number(argv.t);
const interval = Number(argv.i);
const port = 8080;

if (!time || !interval) {
  console.log('Write correct path source and destination');
  process.exit(-1);
}

const server = http.createServer(function(req, res){
  if (req.method === 'GET' && req.url !== '/favicon.ico') {
    console.log('********START timer***********');

    const inttime = setInterval(() => {
       console.log('echo time = ', Date());
    }, Number(interval * 1000));

    setTimeout(() => {
      console.log('********STOP timer***********') 
      clearInterval(inttime);
      res.end(Date());
    }, time * 1000);
  }
});

server.listen(port, () => {
  console.log('Server running on port: ' + port);
});

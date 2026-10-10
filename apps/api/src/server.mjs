import {createApp} from './app.mjs';
const port=Number.parseInt(process.env.PORT || '3001',10);
createApp().listen(port,()=>console.log(`Atlas API: http://localhost:${port}/api/health`));

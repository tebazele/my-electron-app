const { contextBridge, ipcRenderer } = require('electron');



contextBridge.exposeInMainWorld('versions', {
  // can expose variables also, not just functions
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // NOTE always wrap ipcRenderer in callback to avoid malicious attacks
  // define ping channel to send messages back and forth between main and renderer processes
  ping: () => ipcRenderer.invoke('ping'),
  runPyScript: (scriptPath, args) => {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', [scriptPath].concat(args));

    let data = '';
    pyProg.stdout.on('data', (stdout) => {
      data += stdout.toString();
    })

    pyProg.stderr.on('data', (stderr) => {
      console.log(`stderr: ${stderr}`);
    });

    pyProg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log(data);
    })
  }
})





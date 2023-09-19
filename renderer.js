const information = document.getElementById('info')
// @ts-ignore
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
// @ts-ignore
  const response = await window.versions.ping()
  console.log(response);
  document.getElementById('response').innerText = response
}

func()

// @ts-ignore
document.getElementById('data').innerText = versions.runPyScript('example.py')
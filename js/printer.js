const { ipcRenderer } = require('electron')
const embed = document.getElementById("pdfview");
const body = document.getElementsByTagName('body')

// ipcRenderer.on("change-pdf",()=>{
//     embed.removeAttribute('src')
//     embed.setAttribute('src',"../table.pdf");
// })

document.onload=function () {
  console.log("embed")
      embed.removeAttribute('src')
    embed.setAttribute('src',"../table.pdf");
}

document.onload = (event) => {
  console.log('page is fully loaded');
};


// ipcRenderer.on('change-pdf', (event, arg) => {
//     console.log(arg) // prints "pong"
//   })
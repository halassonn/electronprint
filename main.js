const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const  {jsPDF,pageFormats } = require('jspdf')
require('jspdf-autotable');
const print =require("pdf-to-printer");

let win;
let printPriview;
let setoranTabungan;


function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html')

  // win.webContents.on('did-finish-load', () => {
  //   console.log("get Printers ");
  //   const printers = win.webContents.getPrinters();
  //   console.log(printers);
  // })
}

function createWindowPrintPriview (parent,renderfile) {
  const winprint = new BrowserWindow({
    width: 400,
    height: 500,
    parent:parent,
    show:false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  winprint.loadFile(renderfile)

  winprint.on("closed",()=>{
    printPriview=undefined;
  })

  winprint.webContents.on('did-finish-load', () => {
    console.log("get Printers ");
    // const printers = winprint.webContents.getPrinters();
    // console.log(printers);
  })
  return winprint;
}

function createModal(parent,frame,renderfile) {
  const modal = new BrowserWindow({
    width: 400,
    height: 500,
    parent:parent,
    show:false,
    frame:frame?true:false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  modal.loadFile(renderfile)

  modal.on("closed",()=>{
    setoranTabungan=undefined;
  })

  modal.webContents.on('did-finish-load', () => {
    console.log("get Printers ");
    // const printers = winprint.webContents.getPrinters();
    // console.log(printers);
  })
  return modal;
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on("openPrintWind",(event,arg)=>{
  
  const {columns, rows}=arg;
  // const doc = new jsPDF();
  const f4=[330,210]
  const A4=[330,210]
  const doc=new jsPDF('l', 'mm','legal',true);
  doc.autoTable(columns, rows, {
    // styles: {fillColor:255},
    // columnStyles: {
    //   id: {fillColor: 255}
    // },
    // margin: {top: 60},
    // beforePageContent: function(data) {
    // 	doc.text("Header", 40, 30);
    // }
    pageBreak:'auto',
    rowPageBreak:'auto',
    tableLineWidth:0
});
// doc.save('table.pdf');
doc.save("table.pdf", {returnPromise:true}).then(
()=>{
//  console.log(event)

  if(!printPriview){
    printPriview = createWindowPrintPriview(win,"./printer.html");
    printPriview.show();
  }
  // printPriview.webContents.send('change-pdf',"horas")
});
})


ipcMain.on("silentPrint",(event,arg)=>{
  // print.getPrinters().then((print)=>{console.log(print)})

  const slip=[160,105]
  print.getDefaultPrinter().then((defaultprint)=>{ console.log("defaultprint : ",defaultprint)});

  const doc=new jsPDF('p', 'mm','legal',true);

  var InitialstartX=12;
    var startX=20;
    var InitialstartY=12;
    var startY=0;

  var lineSpacing={
    NoSpacing:5,
    NormalSpacing:12,
  };
  var fontSizes={
    HeadTitleFontSize:18,
    Head2TitleFontSize:16,
    TitleFontSize:14,
    SubTitleFontSize:12,
    NormalFontSize:10,
    SmallFontSize:8
  };
  // console.log(doc.getFontList())
  doc.setFont("Courier","normal");
  doc.setFontSize(fontSizes.SmallFontSize);

  // doc.text("---------------",InitialstartX,InitialstartY,{align: "left"});
  // doc.text("Nik",  InitialstartX, startY+=lineSpacing.NoSpacing,{align: "left"},);
  // doc.text(":",  startX*3+3, startY,{align: "left"});
  // doc.text(arg.nik.toString(),  startX*3+5, startY,{align: "left"});

  // doc.text("Nama",  InitialstartX, startY+=lineSpacing.NoSpacing,{align: "left"},);
  // doc.text(":",  startX*3+3, startY,{align: "left"});
  // doc.text(arg.nama,  startX*3+5, startY,{align: "left"});

  // doc.text("Tempat/Tgl Lahir",  InitialstartX, startY+=lineSpacing.NoSpacing,{align: "left"},);
  // doc.text(":",  startX*3+3, startY,{align: "left"});
  // doc.text(arg.alamat,  startX*3+5, startY,{align: "left"});



  doc.text(arg.tgl.toString(),  startX+100, startY+12,{align: "left"});

  doc.text(arg.norek.toString(),  startX, startY+40,{align: "left"},);
  doc.text(arg.nama.toString(),  startX+75, startY+40,{align: "left"});

  doc.text(arg.nominal.toString(),  startX, startY+57,{align: "left"},);
  doc.text(arg.terbilang.toString(),  startX+47, startY+57,{align: "left"});

  doc.text(arg.ket.toString(),  startX+18, startY+68,{align: "left"});
  doc.text(arg.penyetor.toString(),  startX+80, startY+96,{align: "left"});


  // doc.text("Tempat/Tgl Lahir",  InitialstartX, startY+=lineSpacing.NoSpacing,{align: "left"},);
  // doc.text(":",  startX*3+3, startY,{align: "left"});
  // doc.text(arg.alamat,  startX*3+5, startY,{align: "left"});


  doc.save("table.pdf", {returnPromise:true}).then(
    ()=>{
    //  console.log(event)

    // print.print('./table.pdf').then(console.log).catch((err)=>{console.log(err)})
    
      if(!printPriview){
        printPriview = createWindowPrintPriview(win,"./printer.html");
        printPriview.show();
      }
      // printPriview.webContents.send('change-pdf',"horas")
    }
    );
})


ipcMain.on("openSetorantab",(event,arg)=>{
  console.log("open setoran Tab")
  if(!setoranTabungan){
    setoranTabungan = createModal(win,false,"./view/setoranTab.html");
    setoranTabungan.show();
  }
})
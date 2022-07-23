
const button = document.querySelector('#button'); // DOM 
var writer;
var port;
var textEncoder;
var writableStreamClosed;


const texts = document.querySelector('.texts'); // DOM 

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const arabicButton = document.querySelector('#arabic'); // DOM 
const englishButton = document.querySelector('#english'); // DOM 

arabicButton.addEventListener('click', ()=>{
  
  recognition.lang = 'ar';
  arabicButton.classList.add("d-none");

  
  englishButton.classList.remove("d-none");

})

englishButton.addEventListener('click', ()=>{
  
  recognition.lang = 'en-US';
  englishButton.classList.add("d-none");

  
  arabicButton.classList.remove("d-none");

})

let p = document.createElement('p'); // DOM


  button.addEventListener('click', async () => {
  // Filter on devices with the Arduino Uno USB Vendor/Product IDs.
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
  ];
  // Prompt user to select an Arduino Uno device.
  port = await navigator.serial.requestPort({ filters });

  const { usbProductId, usbVendorId } = port.getInfo();

  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

  textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter()


  recognition.addEventListener('result', async (e)=>{

  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    

  p.innerText = text;


  
  if(e.results[0].isFinal){

    await writer.write(text);
    
    // Specilized responses:

    if (text.includes('how are you')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'I am fine';
      texts.appendChild(p)
    }

    if (text.includes('left')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'going left';
      texts.appendChild(p)
    }

    if (text.includes('go ahead')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'going ahead';
      texts.appendChild(p)
    }
    if (text.includes('go back')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'going backward';
      texts.appendChild(p)
    }

    if (text.includes('stop')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'stoping';
      texts.appendChild(p)
    }

    if (text.includes('right')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'going right';
      texts.appendChild(p)
    }
    if (text.includes("what's your name") || text.includes('what is your name')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'My Name is Bahaa';
      texts.appendChild(p)
    }
    if (text.includes('open Smart methods')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'opening smart methods website';
      texts.appendChild(p)
      console.log('opening smart methods website')
      window.open('https://s-m.com.sa/ar/index.html')
    }

    p = document.createElement('p');


    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
        }
      // value is a string.
      console.log(value);
    }

    reader.cancel();
    await readableStreamClosed.catch(() => { /* Ignore the error */ });

    writer.close();
    await writableStreamClosed;

    await port.close();
   }
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();

});




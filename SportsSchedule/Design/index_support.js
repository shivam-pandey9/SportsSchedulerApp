var memory = new WebAssembly.Memory({
    initial: 256,
    maximum: 512
});

var cpp_functions;
WebAssembly.instantiateStreaming(
    fetch("index.wasm"), {
        js: {
            mem: memory
        },
        env: {
            emscripten_resize_heap: memory.grow
           
        }
    }
)
.then(results =>{ 
    cpp_functions = results.instance.exports;
    memory = results.instance.exports.memory;
    console.log('Loaded CPP methods Successfully');
    cpp_functions.main();
    load();
    console.log('Loaded data to table Successfully');
 }
)
.catch(
    error => {
        console.log('Error loading WebAssembly module:', error);
    }
);

// define helper functions.


function encodeArray(arr, len, sizeof = 1) {
    var ptr;
    var out;

    ptr = cpp_functions.wasmmalloc(len * sizeof);
    out = new Uint8Array(memory.buffer, ptr);

    for (var i = 0; i < len; i++) {
        out[i] = arr.charCodeAt(i);
    }
    return ptr;
}

function decodeArray(ptr, len) {
    return new Uint8Array(memory.buffer).slice(ptr, ptr + len);
}

function decodeString(ptr, len) {
    return new TextDecoder("utf8").decode(decodeArray(ptr, len));
}

function decodeString(ptr) {
    var bytes = new Uint8Array(memory.buffer, ptr);
    var strlen = 0;
    while (bytes[strlen] != 0) strlen++;

    return new TextDecoder("utf8").decode(bytes.slice(0, strlen));
}

// Save data to local storage
function saveToLocalStorage(data) {
    localStorage.setItem('myData', data);
}

// Load data from local storage
function loadFromLocalStorage() {
    return localStorage.getItem('myData');
}

function passTocpp(event_name,date_start,date_end,location,watch,comment){
    
var event_nameln = event_name.length;
var event_nameptr = encodeArray(event_name,event_nameln + 1,8);

var date_startln = date_start.length;
var date_startptr = encodeArray(date_start,date_startln + 1,8);

var date_endln = date_end.length;
var date_endptr = encodeArray(date_end,date_endln + 1,8);

var locationln = location.length;
var locationptr = encodeArray(location,locationln + 1,8);

var watchln = watch.length;
var watchptr = encodeArray(watch,watchln + 1,8);

var commentln = comment.length;
var commentptr = encodeArray(comment,commentln + 1,8);

// pass names and lengths
cpp_functions.sendData(event_nameptr,date_startptr ,date_endptr ,locationptr ,watchptr ,commentptr
    , event_nameln, date_startln, date_endln, locationln, watchln, commentln );



cpp_functions.wasmfree(event_nameptr);
cpp_functions.wasmfree(date_startptr);
cpp_functions.wasmfree(date_endptr);
cpp_functions.wasmfree(locationptr);
cpp_functions.wasmfree(watchptr);
cpp_functions.wasmfree(commentptr);

}

// Define functions needed


function submit(){
    console.log("hello");
  var event_name = document.getElementById('name').value;
  var date_start = document.getElementById('start').value;
//   var date_start = new Date(date_start_val);
  var date_end = document.getElementById('end').value;
//   var date_end = new Date(date_end_val);
  var location = document.getElementById('loc').value;
  var watch = document.getElementById('watch').value;
  var comment = document.getElementById('com').value;

  passTocpp(event_name,date_start,date_end,location,watch,comment);
  // add to table


}

function fetchDataFromCSV() {
    fetch('data.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.trim().split('\n');
        // Assuming the first row contains column headers
        // console.log(rows);

        for(let i=0;i<rows.length;i++)
        {
        const headers = rows[i].split(',');
        // console.log(headers);
        // Update the values of en, ds, de, lc, wt, cm
        var en = headers[0];
        var ds = headers[1];
        var de = headers[2];
        var lc = headers[3];
        var wt = headers[4];
        var cm = headers[5];
  
        document.getElementById('add-row').innerHTML += 
         ` 
         <tr>
         <td>${en}</td>
         <td>${ds}</td>
         <td>${de}</td>
         <td>${lc}</td>
         <td>${wt}</td>
         <td>${cm}</td> 
         </tr>
         `;
      }

      })
      .catch(error => console.error('Error fetching CSV:', error));
  }

function load(){
console.log("Updating Data");
fetchDataFromCSV();
}













// var en,ds,de,lc,wt,cm;
// while(ds!="end"){

//  en = decodeString(cpp_functions.getevent_name());
//  ds = decodeString(cpp_functions.getdate_start());
//  de = decodeString(cpp_functions.getdate_end());
//  lc = decodeString(cpp_functions.getlocation());
//  wt = decodeString(cpp_functions.getwatch());
//  cm = decodeString(cpp_functions.getcomment());

//  document.getElementById('add-row').innerHTML += 
//  ` 
//  <tr>
//  <td>${en}</td>
//  <td>${ds}</td>
//  <td>${de}</td>
//  <td>${lc}</td>
//  <td>${wt}</td>
//  <td>${cm}</td> 
//  </tr>
//  ` ;

// }



https://github.com/michaelg29/webassembly-tutorial/blob/main/

source ema... to add as path

http-server    = to use this as not allowed on file

emcc file name -o file out

source emsdk/emsdk_env.sh

http-server

npm install @wasmer/wasi

print in main if want from cpp file

chmod -R 777 ./

sanbox memory by browser

load css in ?v to register

 EMSCRIPTEN_KEEPALIVE
    char* myFunction( char* s, int n) {
        // Allocate memory for ans
        // char* ans = static_cast<char*>(malloc(n + 1));
        // char *ans = "hello".c_str();
        char* ans = static_cast<char*>(malloc(n + 5 + 1));
        // Copy the contents of s to ans
        for (int i = 0; i < n; i++) {
            ans[i] = s[i];
        }
        strcpy(ans, s);
        strcat(ans, "hello");
        // strcat(ans,"shivam");
        // Null-terminate the ans string
        // ans[n] = '\0';

        return ans;
    }
    
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
 }
)
.catch(
    error => {
        console.log('Error loading WebAssembly module:', error);
    }
);

// define methods.

function run_wasm(){
    var str = "Hello, WebAssembly!";
    var ln = str.length;

    var strPtr = encodeArray(str,ln + 1,8);
    
    let aa = cpp_functions.myFunction(strPtr,ln);
    let ab = decodeString(aa);
    console.log(ab);

    cpp_functions.wasmfree(strPtr);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}



    
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


EMSCRIPTEN_KEEPALIVE
        const char* setevent_name(char ch[]){
        //    std::string st = "hello";
        Sevent_name  = "hhhhh";
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }

    EMSCRIPTEN_KEEPALIVE
        const char* setdate_start(char ch[]){
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }
    
    EMSCRIPTEN_KEEPALIVE
        const char* setdate_end(char ch[]){
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }

    EMSCRIPTEN_KEEPALIVE
        const char* setlocation(char ch[]){
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }

    EMSCRIPTEN_KEEPALIVE
        const char* setwatch(char ch[]){
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }

    EMSCRIPTEN_KEEPALIVE
        const char* setcomment(char ch[]){
        int ln = strlen(ch);
        char *ss = get_string(ch,ln);
        return ss;
    }

    char Sevent_name[100];
    char Sdate_start[100];
    char Sdate_end[100];
    char Slocation[100];
    char Swatch[100];
    char Scomment[100];


























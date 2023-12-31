#include <iostream>
#include <cstring>
#include <emscripten.h>
#include <vector>
#include <fstream>


char* get_string(char* str,int ln){
        char* ans = static_cast<char*>(malloc(ln + 1));
        for (int i = 0; i < ln; i++) {
            ans[i] = str[i];
        }
return ans;
}
struct Data{
    char* Sevent_name ;
    char* Sdate_start;
    char* Sdate_end;
    char* Slocation;
    char* Swatch;
    char* Scomment;
}info;

extern "C" {

    EMSCRIPTEN_KEEPALIVE
    void sendData(char* event_namestr,char* date_startstr ,char* date_endstr ,char* locationstr ,char* watchstr ,char* commentstr
    , int event_nameln, int date_startln, int date_endln, int locationln, int watchln, int commentln) {
         
// FILE* file = fopen("data.csv", "a");  // Use "a" to open the file in append mode
// fprintf(file, "%s,%s,%s,%s,%s,%s\n", event_name, date_start, date_end, location, watch, comment);
// fclose(file);

        char* event_name =  get_string(event_namestr,event_nameln);
        char* date_start =  get_string(date_startstr,date_startln);
        char* date_end =  get_string(date_endstr,date_endln);
        char* location =  get_string(locationstr,locationln);
        char* watch =  get_string(watchstr,watchln);
        char* comment =  get_string(commentstr,commentln);
        // Add this data to file   
    }

    EMSCRIPTEN_KEEPALIVE
    const char* getevent_name()
    {
        return info.Sevent_name;
    }

     EMSCRIPTEN_KEEPALIVE
    const char* getdate_start()
    {
        return info.Sdate_start;
    }

     EMSCRIPTEN_KEEPALIVE
    const char* getdate_end()
    {
        return info.Sdate_end;
    }

     EMSCRIPTEN_KEEPALIVE
    const char* getlocation()
    {
        return info.Slocation;
    }

     EMSCRIPTEN_KEEPALIVE
    const char* getwatch()
    {
        return info.Swatch;
    }

     EMSCRIPTEN_KEEPALIVE
    const char* getcomment()
    {
        return info.Scomment;
    }
    

    EMSCRIPTEN_KEEPALIVE
    void *wasmmalloc(size_t n)
    {
        return malloc(n);
    }

    EMSCRIPTEN_KEEPALIVE
    void wasmfree(void *ptr)
    {
        free(ptr);
    }

EMSCRIPTEN_KEEPALIVE
int main(){

// get data from file: use static method



    char Fevent_name[]="end";
    char Fdate_start[]="end";
    char Fdate_end[]="end";
    char Flocation[]="end";
    char Fwatch[]="end";
    char Fcomment[]="end";

    info.Sevent_name = get_string(Fevent_name,strlen(Fevent_name));
    info.Sdate_start= get_string(Fdate_start,strlen(Fdate_start));
    info.Sdate_end= get_string(Fdate_end,strlen(Fdate_end));
    info.Slocation= get_string(Flocation,strlen(Flocation));
    info.Swatch= get_string(Fwatch,strlen(Fwatch));
    info.Scomment= get_string(Fcomment,strlen(Fcomment));


 return 0;
}


}




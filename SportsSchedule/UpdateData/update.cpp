#include <iostream>
#include <cstdlib>
#include <string>

int main(){

std::string command = "python3 ";
std::string pythonScript = "./update.py";
std::string postCommand = "";
std::string fullCommand = command+pythonScript+postCommand;

int result = system(fullCommand.c_str());

if(result==0){
    std::cout<<"python script ran successfully"<<std::endl;
}
else{
    std::cerr<<"python script failed to run"<<std::endl;
}
    return 0;
}
/
//  main.cpp
//  Chapter6Exercise2
//
//  Created by Korrol Schuneman on 20/03/2017.
//  Copyright © 2017 Korrol Alexander Schuneman. All rights reserved.
//  Simple calculator to implement a set of grammar rules

#include "std_lib_facilities.h"

/*
 Classes used
 */
//Token declaration - read sequence of characters

class Token{
    
public:
    char type_token;
    double value_token;
};
//-------------------------------------------------

//Token Stream declaration
/*
 1. Uses Token to get the token data
 2. Uses a buffer to store token using putback()
 3. bool is used as a flag to indicate whether there is a token in the buffer or not
 */

class Token_stream {
    
public:
    Token get();
    void putback(Token t);
    
private:
    bool full {false};
    Token buffer;
    
};

//-------------------------------------------------
//Initialising a token stream
Token_stream ts;

//-------------------------------------------------


int main() {
    cout << "Hello, and welcome to my simple calculator program!\n"
         << "Here are the instructions for using the calculator:\n"
         << "Enter an expression that you want to evaluate followed by a semi-colon, ';' to finish the expression\n"
         << "To terminate the program, use 'q' for 'QUIT'\n";
    return 0;
}

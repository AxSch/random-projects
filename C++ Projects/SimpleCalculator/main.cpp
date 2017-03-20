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

/*
  Grammar:
 
    Expression:
        Term
        Expression '+' Term
        Expression '-' Term
 
    Term:
        Primary
        Term '*' Primary
        Term '/' Primary
        Term '%' Primary
 
    Primary:
        Number
        '{' Expression '}
        '(' Expression ')'

    Number:
        floating-point literal
 
 */

/*
 Grammar functions used by the calculator:
    1. expression() is used to handle addition & subtraction
    2. term() is used to handle multiplication, division & modulo
    3. primary() is used to handle numbers, parentheses and curly braces
 */

double expression();
double term();
double primary();

//Expression() function definition
double expression() {
    /*
        1. Call term()
        2. Retrieve token and evaluate it
        3. Return the result
     */
    
    double user_expression = term();
    Token t = ts.get();
    while(true){
        switch(t.type_token){
                
            case '+': //Checks for a token with type '+'
                user_expression += term(); //Evaulates addition
                t = ts.get(); //Get the next token from the stream
                break;
            
            case '-':
                user_expression -= term();//Same as above but for subtraction
                t = ts.get();
                break;
                
            default:
                ts.putback(t); //Once there are no more tokens matching the case above, the token t is putback into the stream
                return user_expression; //Return the result(Hopefully the correct one)
        }
    }
    
}
//-------------------------------------------------

double term() {
    double user_expression = primary();
    Token t = ts.get();
    while(true){
        switch (t.type_token)
        {
            case '*':
                user_expression *= primary();
                t = ts.get();
                break;
            
            case '/':
                {
                    double divis_expression = primary();
                    if(divis_expression == 0) error("Division By Zero");
                    user_expression /= divis_expression;
                    t = ts.get();
                    break;
                }
            case '%':
                {
                    double rounding = round(primary());
                    int mod_num = (int)rounding;
                    if(mod_num == 0)error("Cannot modulo by Zero");
                    user_expression %= mod_num;
                    t = ts.get();
                    break;
                }
        default:
        ts.putback(t);
        return user_expression;
        }
    }
}
//-------------------------------------------------

int main() {
    cout << "Hello, and welcome to my simple calculator program!\n"
         << "Here are the instructions for using the calculator:\n"
         << "Enter an expression that you want to evaluate followed by a semi-colon, ';' to finish the expression\n"
         << "To terminate the program, use 'q' for 'QUIT'\n";
    return 0;
}

#!/usr/bin/bash

DATA=""

CreateAccount() {
    curl --location 'http://localhost:3000/v1/accounts' \
    --header 'Content-Type: application/json' \
    --data "$1"
    echo
}
CreateMovement() {
    curl --location 'http://localhost:3000/v1/movements' \
    --header 'x-user: '$2 \
    --header 'Content-Type: application/json' \
    --data "$1"
    echo
}
CreatePixMovement() {
    curl --location 'http://localhost:3000/v1/movements/pix' \
    --header 'x-user: '$2 \
    --header 'Content-Type: application/json' \
    --data "$1"
    echo
}

# CreateAccount '{ "name": "Ação Social Governamental", "type": "Corrente" }' # 1
# CreateAccount '{ "name": "Ação Social Governamental", "type": "Poupança" }' # 2
# CreateAccount '{ "name": "Terezinha Soares Rorato", "type": "Corrente" }' # 3
# CreateAccount '{ "name": "Francisco Striquer Soares", "type": "Corrente" }' # 4
# CreateAccount '{ "name": "Dionísio Striquer Soares", "type": "Corrente" }' # 5
# CreateAccount '{ "name": "Christovão Striquer Soares", "type": "Corrente" }' # 6
# CreateAccount '{ "name": "José Tadeu Striquer Soares", "type": "Corrente" }' # 7
# CreateAccount '{ "name": "Maria Candida Soares Klen", "type": "Corrente" }' # 8
# CreateAccount '{ "name": "Pedro Aecio Striquer Soares", "type": "Corrente" }' # 9
# CreateAccount '{ "name": "Marcos Antônio Striquer Soares", "type": "Corrente" }' # 10
# CreateAccount '{ "name": "Eliziário Striquer Soares", "type": "Corrente" }' # 11
# CreateAccount '{ "name": "Domingos Striquer Soares", "type": "Corrente" }' # 12
# CreateAccount '{ "name": "Bernadette Soares Sanches", "type": "Corrente" }' # 13
# CreateAccount '{ "name": "Ricardo Striquer Soares", "type": "Corrente" }' # 14
# CreateAccount '{ "name": "Ana Cristina Vieira", "type": "Corrente" }' # 15

# over 10 the account field should be deleted from the table for it has no
# records on movement. Below that it should remove the records from its user
# from movement keeping references to the account on destiny and origin fields
# but update the "name" field on account


# CreatePixMovement '{ "destiny": 1, "amount": "1000000.12" }' 1
# CreatePixMovement '{ "destiny": 2, "amount": "1000" }' 1
# CreatePixMovement '{ "destiny": 3, "amount": "2000" }' 1
# CreatePixMovement '{ "destiny": 4, "amount": "3000" }' 1
# CreatePixMovement '{ "destiny": 5, "amount": "4000" }' 1
# CreateMovement '{ "destiny": 5, "amount": "4000" }' 1
# CreateMovement '{ "origin": 1, "destiny": 6, "amount": "10" }' 1
# CreateMovement '{ "origin": 1, "destiny": 7, "amount": "10" }' 1
# CreateMovement '{ "origin": 1, "destiny": 8, "amount": "10" }' 1
# CreateMovement '{ "origin": 1, "destiny": 9, "amount": "10" }' 1
# CreatePixMovement '{ "origin": 1, "destiny": 9, "amount": "10" }' 1
# CreatePixMovement '{ "origin": 1, "destiny": 10, "amount": "10" }' 1
# CreatePixMovement '{ "destiny": 9, "amount": "10" }' 2
# CreatePixMovement '{ "destiny": 10, "amount": "10" }' 2
# CreatePixMovement '{ "destiny": 9, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "100" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "33" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "2.50" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "3.80" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "3.82" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "7" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
# CreatePixMovement '{ "destiny": 3, "amount": "10" }' 3
CreatePixMovement '{ "origin": 1, "amount": "2.50" }' 1

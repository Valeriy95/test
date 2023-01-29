"use strict"

async function getQuotes() {  
   const quotes = 'data.json';
   const res = await fetch(quotes);
   const data = await res.json(); 
   let a = Math.floor(Math.random() * 3);
   console.log(a);
   console.log(data[a][text]);
//    console.log(data[a][author]);
 }
 getQuotes();

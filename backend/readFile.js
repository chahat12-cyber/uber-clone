


const line= '{[()]}';

     function read(){
        console.log(line.includes('{', 1))
        for(var i =0 ; i > line.length ; i++ ){
           for(var j = line.length; j > line.length-1 ; j-- ){
            
               if(line.includes('{', i) ){
                 console.log(true);
               }
           }
         }
     }


     read();
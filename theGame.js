class Minefield {
    /* Construct a minefield with the given width, height, and the number of mines. */

    constructor(height, width, mines) {
        /* Sanitize input parameters. */
        width = Number(width);
        height = Number(height);
        mines = Number(mines);
        if (!Number.isInteger(width)) width = 10;
        if (!Number.isInteger(height)) height = 10;
        if (!Number.isInteger(mines)) mines = 10;
        
        /* Validate input parameters. */
        if (width < 1) width = 1;
        if (height < 1) height = 1;
        if (mines > width * height) mines = width * height;
        
        var where = document.getElementById("output");
        // Initialize the minefield.

        this.fieldWidth = width;
        this.fieldHeight = height;
        this.numMines = mines;
        this.tmp = 1;
        this.currentTime = "";
        this.field = new Array(width);
        this.checked = new Array(width);
        this.counters = new Array(width);
        this.flags = new Array(width);
        this.record = new Array(10000);

        this.name= "";
        this.time= "";
        this.isSaved = false;


        for (var x = 0; x < width; x++) {
            this.field[x] = new Array(height);
            this.checked[x] = new Array(height);  
            this.counters[x] = new Array(height);
            this.flags[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                this.field[x][y] = document.createElement("button");
                //this.field[x][y].click(alert("hey"));                             
                
                //function myFunction() open(x,y);

                this.field[x][y].style.backgroundImage = "url('cover.jpg')";
                this.field[x][y].style.width = '20px'; // setting the width to 200px
                this.field[x][y].style.height = '20px';
                this.field[x][y].style.border = '1px solid gray';
                this.field[x][y].style.borderRadius = '0px';
                where.appendChild(this.field[x][y]);
                //this.field[x][y].onclick = open(x, y);
                this.checked[x][y] = false;
                this.counters[x][y] = -2;  //pocetna vrednost -2
                this.flags[x][y] = 0;
            }
        }

        // Place mines. 
    
   

       while ( mines>0 ) {
            var x = Math.floor(Math.random() * this.fieldWidth);
            var y = Math.floor(Math.random() * this.fieldHeight);
           if (this.counters[x][y] != -1 ) { 
               this.counters[x][y] = -1;
                mines--;
            }

        }

                                    
        for (var i = 0; i<width; i++){
            for(var j = 0; j<height; j++){
                if (this.counters[i][j] == -2){
                var m = 0;
                    for (var ii = i-1; ii <= i+1; ii++){
                        for (var jj = j-1; jj<= j+1; jj++){
                            if (ii>= 0 && ii<width && jj>=0 && jj<height && this.counters[ii][jj]==-1) {
                                  m++;
                            }
                        }
                    }
                this.counters[i][j] = m;
                }
            }
        }


    
}

hint (x, y) {

    var checked = this.checked;
    var counters = this.counters;
    var width = this.fieldWidth;
    var height = this.fieldHeight;
    var timerCounter = this.timerCounter;

    if (checked[x][y])  return "already opened";  //otvoreno
    else  return "" + counters[x][y];
     /*var ss = "";
     for (var i = 0; i<width; i++){
            for(var j = 0; j<height; j++){
                    ss=ss+counters[i][j];
            }
            ss = ss+"\n";
      }
    return ss;*/

}

flag (x, y) {

    var field = this.field;
    var checked = this.checked;
    var counters = this.counters;
    var flags = this.flags;
    
    if (checked[x][y] && flags[x][y]==0) flags[x][y]=0;  //otvoreno
    else if (checked[x][y] && flags[x][y]==1){
       field[x][y].style.backgroundImage = "url('cover.jpg')";
       flags[x][y] = 0;
       checked[x][y]=false;
    }
    else  {
       field[x][y].style.backgroundImage = "url('flag.png')";
       flags[x][y] = 1;
       checked[x][y]=true;
    }

}

openn (x, y, k){
    var field = this.field;
    var checked = this.checked;
    var counters = this.counters;
    var width = this.fieldWidth;
    var height = this.fieldHeight;
    var sound1 = new Sound("click.mp3");
    var sound2 = new Sound("bomb.mp3");
    var mines = this.numMines;    



    if (checked[x][y] && k==1)  alert("already opened");
    else if (checked[x][y] && k==0) k=0;
    else {

        switch(counters[x][y]) {
            case 1:  field[x][y].style.backgroundImage = "url('one.png')";                     
                     sound1.play();                     
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 2:  field[x][y].style.backgroundImage = "url('two.png')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 3:  field[x][y].style.backgroundImage = "url('three.png')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 4:  field[x][y].style.backgroundImage = "url('four.jpg')"; 
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 5:  field[x][y].style.backgroundImage = "url('five.png')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 6:  field[x][y].style.backgroundImage = "url('six.png')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 7:  field[x][y].style.backgroundImage = "url('seven.jpg')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 8:  field[x][y].style.backgroundImage = "url('eight.png')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     break;
            case 0:  field[x][y].style.backgroundImage = "url('white.jpg')";
                     sound1.play();
                     checked[x][y]=true;
                     this.end(x, y);
                     for (var i = x-1; i<=x+1; i++) {
                            for (var j =y-1; j<=y+1; j++){
                                if (i>=0 && i<width && j>=0 && j<height ){
                                    this.openn (i, j, 0);
                                }
                            }
                            
                        }
                     break;
            case -1: field[x][y].style.backgroundImage = "url('bomb.png')";                     
                     sound2.play();
                     checked[x][y]=true;
                     /*for (var i=0; i<width; i++){
                        for (var j=0; j<height; j++){
                            this.openn(i, j, 0);
                        }
                     }*/
                     this.end(x, y);
                     break;
            default: //nothing


  }

}

}//end open


end (x, y) {
    var checked = this.checked;
    var counters = this.counters;
    var width = this.fieldWidth;
    var height = this.fieldHeight;
    var mines = this.numMines;
    var cnt=0;
    var tmp = this.tmp;
    var flag = this.flags;


    if(counters[x][y]== -1){
        tmp=0;
        alert("better luck next time");
        for (var i=0; i<width; i++){
            for (var j=0; j<height; j++){
                            checked[i][j]=true;
             }
        }

    }
    else {
        for (var i=0; i<width; i++){
            for (var j=0; j<height; j++){
                if (checked[i][j]&& flag[i][j]==0){                
                    cnt++;
                }
            }
        }
        if((width*height - mines ) == cnt ) {
            /*for (var i=0; i<width; i++){
               for (var j=0; j<height; j++){
                    this.openn(i, j, 0);
               }
            } */
            tmp=0;   
            //alert("well done");
            //location.replace("enter.html");
            var person = prompt("Congrats, you won. Enter your name to our top player list!", "Name...");
            var time = document.getElementById("time").innerHTML;
            var intTime = time.split(':');   //returns array, first el minutes, second seconnds
            var sec = Number(intTime[0])*60 + Number(intTime[1]);
            console.log(sec);
              if (person != null) {
                localStorage.setItem("item", [person, time]);
                //localStorage.setItem("time", sec);
                //console.log(person);
                //console.log(time);
                //for(var i=0; i<localStorage.length; i++){
                  //  console.log(localStorage[i].getItem("item"));
                //}
                console.log(localStorage.getItem("item"));

                /*const toSend = {           //ajaxxxxxxxxxxx?
                    name: person,
                    time: sec
                };
                const jsonString = JSON.stringify(toSend);
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "receive.php");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(jsonString);*/







                //isSaved=true;
                
                
                var blob = new Blob([localStorage.getItem("item")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "players.txt");

                /* f.writeln(f, localStorage.getItem("item"));
                txtFile.close();*/
                
               // var output = "players.txt";
                //fs.writeFileSync(output, [localStorage.getItem("item")]);;


                //READ/DELETE
                //var fr=new FileReader(); 
                /*fr.onload=function(){ 
                    document.getElementById('output') 
                            .textContent=fr.result; 
                } */
                  
                //fr.readAsText(this.record);

                /*function deleteImage(output)
                {
                    
                        $.ajax({
                          url: 'delete.php',
                          data: {'file' : "<?php echo dirname(__FILE__) . '/uploads/'?>" + output },
                          success: function (response) {
                             // do something
                          },
                          error: function () {
                             // do something
                          }
                        });
                    
                }


                                $(function(){
                $('a.delete').click(function(){
                  $.ajax({
                   url:'delete.php',
                   data:'id/name here',
                   method:'GET',
                   success:function(response){
                    if (response === 'deleted')
                    {
                       alert('Deleted !!');
                    }
                   }
                  });
                });
                });



                /*fun koja ucita iz fajla rec1 (record easy) i sacuva u stringu records1 
                onda uzima 3 stringa iz tog stringa tako da sadrze prvo rezultatt pa ime i uporedjuje sa nasim novim rezultatom
                ako je rez bollji od nekog od njih, onda se stavlja u recors1 pre njega (kada opet sastavimo string records od prethodna 3 stringa i novog)
            pa onda obrisemo fajl rec1 
                pa ga opet napravimo i stavimo u njega novi/stari record1 */



                //NODE
                /*var data = {person, sec};
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                fetch ('/api', options);*/
              }
            
    }
    return cnt;
  }
}


timer(){
    
    var text = document.getElementById("time");
    var cnt = 0;
    var currentTime = this.currentTime;
    var t = this.tmp;

    function convertSeconds(s) {
                  var min = Math.floor(s / 60);
                  var sec = s % 60;

                  if (min<10 && sec<10) return '0' + min +  ':' + '0' + sec;
                  else if (min<10)      return '0' + min +  ':' + sec;                
                  else if (sec<10)      return  min +  ':' + '0' + sec;               
                  else                  return min + ':' + sec;
                }

    if (t==1){
        var funk = setInterval(function(){
                if(document.getElementById('hintBtn').clicked == true) cnt+=10;
                else cnt++;
                text.innerHTML = convertSeconds(cnt);
                if(t==0) {
                   currentTime=text.innerHTML; 
                   clearTimeout( funk );
                }
        }, 1000); 
    }
    else if (t==0){
        currentTime=text.innerHTML; 
        clearTimeout( funk );
    }
   
}

/*getName() {
    return this.name;
}

getTime() {
    return this.time;
}

getIsSaved() {
    return this.isSaved;
}*/
}
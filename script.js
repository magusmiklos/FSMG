document.addEventListener("DOMContentLoaded", function() {

    //reload button
    document.getElementById("reload").addEventListener('click',function(){
        window.location.reload();
    })

    //next map button
    document.getElementById("next").addEventListener('click',function(){
        sessionStorage.clear();
        window.location.reload();
    })

    setUpGame();
});
let running = false
let intervalId 
let win = false
let finishes = 0
let reached = 0

function setUpGame(cubes){

    //generate maps
    /* empy map
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFF",
    */

    let maps = [[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFT",
        "FFTFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFPF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FPFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFWWFWWFFFFFFFFFF",
        "FFFFFFFFFWFFWFFWFFFFFFFFF",
        "FFFFFFFFFFWFFFWFFFFFFFFFF",
        "FFFFFFFFFFFWFWFFFFFFFFFFF",
        "FFFFFFFFFFFFWFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFTF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FPFFFFFFFFFFFFFFFFFFFFTTF",
        "FFFFFFFFFFFFFFFFFFFFFFFTF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFWWWWFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFPFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFTFFFFFFFFFFFFFFFFFFFTFF",
        "FTTFFFFFFFFFFFFFFFFFFFTTF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "WWWWWWWFFFFFFFFFFFWWWWWWW",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFPFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFWWWWWFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFWWWWWWFFFF",
        "FFFFFFFFFFFTTTFFFFFFWFFFF",
        "FFFFFFFFFFFTTTFFFFFFWFFFF",
        "FFFFFFFFFFFTTTFFFFFFWFFFF",
        "FFFFFFFFFFFFFFFFFFFFWFFFF",
        "FWWWWWFFFFWWWWWFFFFFWFFFF",
        "FWFFFWFWFFWFFFWFFFFFWFFFF",
        "FWFFFWFWWFWTTTWFFFFFWFFFF",
        "FWTTTWFWFFWFFFWFFFFFWFFFF",
        "FWWWWWFFFFWWWWWFFFFFWFFFF",
        "FFFFFFFFFFFFFFFFFFFFWFFFF",
    ],[
        "FFFWFFFFFFFFFFFFFFFFFFFFF",
        "FFWFFFFFFFFFFFFFFFFFFFFPF",
        "FWFFFFFFFFFFFFFFFFFFFFFFF",
        "WFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFWFFFFFFFFFFFFFFFFFF",
        "FTFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFWFFFFFFFFFFFFFFFFFFFF",
        "WWWWFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FPFPFPFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
        "FTTTFFFWFFFFFFFFFFFFFFFFF",
        "FFFFFFFWFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFWWWWFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFWWWWFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FWWWWFFFFFFFFFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
        "FFTFFFFFFFTFFFFFFTFFFWFFF",
        "FFFFFFFFFFFFFFFFFFFFFWFFF",
    ],[
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FWFFFFFFFFFFFFFFFFFFFFFPF",
        "FWFFFFFFFFFFFFFFFFFFFFFFF",
        "FWFFFFFFFFFFFFFFFFFFFWFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTFFFFFFFFFFFFFFFFFFFFFFF",
        "FTTTTTTTTTTTTTTTTTTTTWWWF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
    ],[
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FTTTFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFFFFFFFFFFFFFFFFFFFPF",
        "FFFFFFFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
        "FTTTFWFFFFFFFFFFFFFFFFFFF",
        "FFFFFWFFFFFFFFFFFFFFFFFFF",
    ]
    ]
    let mapId;
    let rand = Math.floor(Math.random() * maps.length);
    const sessionMapId = sessionStorage.getItem('mapId')
    if(sessionMapId === null){
        mapId = rand;
        sessionStorage.setItem('mapId',rand.toString());
    }
    else{
        mapId = parseInt(sessionMapId, 10);
    }
    let map = maps[9];
    

    //get finishes
    map.forEach(str => {
        Array.from(str).forEach(char =>{
            if (char === "P") finishes+= 1
        })
    })

    //generate play area
    cubes = !cubes ? 500 : cubes;
    let row = 25;
    for (let i = 0; i < cubes; i++) {
        let c = document.createElement('div');
        c.id = `cube${i}`;
        c.classList.add('cube');

        
        let x = Math.floor(i / row)
        let y = i % row 
        //console.log(`${x} ${y} : ${i}`)
        
        if(map[x][y] === "F") c.classList.add('false');
        if(map[x][y] === "T") c.classList.add('true');
        if(map[x][y] === "W") c.classList.add('wall');
        if(map[x][y] === "P") c.classList.add('finish');

        document.getElementById("game").appendChild(c);
    };

    //generate rule boxes
    for (let l = 0; l < 3; l++) {
        let b = document.createElement('div')
        b.id = `ruleBox${l}`
        b.classList.add("ruleBox")
        document.getElementById('rule').appendChild(b);
        for (let i = 0; i < 2; i++) {

            let r = document.createElement('div');
            r.id = `rule${l}:${i}`
            r.classList.add("Irules")
            document.getElementById(`ruleBox${l}`).appendChild(r);

            // just an arrow for visuals
            if (i === 0){
                let cont = document.createElement('div');
                cont.classList.add("arrow-cont");
                let p = document.createElement('div');
                p.classList.add("arrow");

                document.getElementById(`ruleBox${l}`).appendChild(cont);
                cont.appendChild(p);
            } 

            for (let j = 0; j < 9; j++) {
                let c = document.createElement('div');
                c.id = `ruleCube${l}:${i}:${j}`;
                c.classList.add('false');
                c.classList.add('cube');
                c.classList.add('big');
                document.getElementById(`rule${l}:${i}`).appendChild(c);
                c.addEventListener('click', function(){
                    if(!running){
                        this.classList.contains('false') ? (this.classList.remove('false'), this.classList.add('true')) : (this.classList.remove('true'), this.classList.add('false'))
                    }
                })
                
            };
        };
    };
    

    //handle play
    document.getElementById('play').addEventListener('click', function(){
        running = true
        intervalId = setInterval(tick,100)
    })
    
};

function tick(){

    //get rules
    let rulesFrom = [];
    let rulesTo = [];
    

    let rules = document.getElementsByClassName("Irules");

        Array.from(rules).forEach((rule, index) => {
            let s = "";
            Array.from(rule.childNodes).forEach(cube => {
                if (cube.classList.contains("false")) s += "F";
                else if (cube.classList.contains("true")) s += "T";
                else if (cube.classList.contains("wall")) s += "W";
                else if (cube.classList.contains("finish")) s += "P";
            })
            index % 2 === 0 ? rulesFrom.push(s) : rulesTo.push(s);
    })

    //apply rules
    let map = document.getElementById("game");

    let change = true

    const childNodes = Array.from(map.childNodes);
    for (let index = 0; index < childNodes.length; index++) {
        const cube = childNodes[index];
    
        // Construct spot's rule
        let cubeMatrix = [];
        let cubeStr = "";
    
        if(index > 24 && index < 475 && (index + 1) % 25 != 0 && index % 25 != 0) {
            cubeMatrix.push(document.getElementById(`cube${index-26}`));
            cubeMatrix.push(document.getElementById(`cube${index-25}`));
            cubeMatrix.push(document.getElementById(`cube${index-24}`));
            cubeMatrix.push(document.getElementById(`cube${index-1}`));
            cubeMatrix.push(cube);
            cubeMatrix.push(document.getElementById(`cube${index+1}`));
            cubeMatrix.push(document.getElementById(`cube${index+24}`));
            cubeMatrix.push(document.getElementById(`cube${index+25}`));
            cubeMatrix.push(document.getElementById(`cube${index+26}`));
        }
    
        cubeMatrix.forEach(spot => {
            if (spot.classList.contains("false")) cubeStr += "F";
            if (spot.classList.contains("true")) cubeStr += "T";
            if (spot.classList.contains("wall")) cubeStr += "W";
    
            // Check win
            if(cube.classList.contains("finish")){
                if(spot.classList.contains("true")){
                    cube.classList.add("false");
                    cube.classList.remove("finish");
                    reached += 1;
                }
            }
        });
    
        if(finishes === reached){
            win = true;
        }
    
        // Break interval if win
        if (win) {
            clearInterval(intervalId);
            clearMap();
            return;
        }
    
        // Check if spot and rule match
        if(change){
            for (let i = 0; i < rulesFrom.length; i++){
                if(cubeStr === rulesFrom[i] && cubeStr !== "FFFFFFFFF"){
                    Array.from(rulesTo[i]).forEach((char,index)=> {
                        if(char === "T") document.getElementById(cubeMatrix[index].id).classList.add("true"), document.getElementById(cubeMatrix[index].id).classList.remove("false");
                        if(char === "F") document.getElementById(cubeMatrix[index].id).classList.add("false"), document.getElementById(cubeMatrix[index].id).classList.remove("true");
                    });
                    change = false;
                }
            }
        }
    }
    
};

function clearMap(){
    sessionStorage.clear();
    // handle win
    setTimeout(function(){
        for (let i = 0; i < 500; i++) {
            setTimeout(() => {
                document.getElementById(`cube${i}`).classList.add("true");
            }, (i+1) * 2);
        }
        setTimeout(function(){
            window.location.reload();
        },1200)
    },200)

}

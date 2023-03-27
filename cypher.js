function encode_ascii85(a) {
        var alphabets =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var enc = ""
  for (var i = 0; i < a.length;i++) {
    var randNum = Math.floor(Math.random() * 150) + 100
    if (randNum % 2 != 0) {
        randNum -= 1
    }
    if (a[i] == "0" || a[i] == "1") {
      enc += a[i].charCodeAt(0) + randNum + alphabets[Math.floor(Math.random() * alphabets.length)];
    } else {
        enc += a[i].charCodeAt(0) + alphabets[Math.floor(Math.random() * alphabets.length)];
    }
  }
  return enc
}

function decode_ascii85(a) {
    var enc = ""
    var alphabets =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var codes = []
    for (var i = 0; i < a.length - 1;i += 3) {
        if (alphabets.indexOf(a) < 0) {
            if (alphabets.indexOf(a[i + 2]) > -1) {
            codes.push(a[i].toString() + a[i + 1].toString())
            } else {
                if (i + 2 < a.length - 1) { 
               codes.push(a[i].toString() + a[i + 1].toString()  + a[i + 2].toString()) 
               i += 1
                }
            }
        }
    }
  for (var i = 0; i < codes.length;i++) {
      var char = codes[i]
      if (codes[i] > 100) {
          if (codes[i] % 2 == 0) {
              char = "48"
          } else {
              char = "49"
          }
      }
      enc += String.fromCharCode(char)
  }
  return enc
}
function cipherRot12(str) {
    
    var alphabets =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'," ", "-", "_", ".", "&","?", "!", "@", "#", "/", "=", 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    
    var alphabets12 = ['M', 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L', " ", "-", "_", ".", "&","?", "!", "@", "#", "/", "=", 'm','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l', "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    
    var resultStr = [];
    for(let i=0; i<str.length; i++){
        for(let j =0; j<alphabets.length; j++){
            if(str[i] === alphabets[j]){
                     resultStr.push(alphabets12[j])
            }
        }
    }
    return resultStr.join("");
  };


function cipherRotm12(str) {
    
    var alphabets12 =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'," ", "-", "_", ".", "&","?", "!", "@", "#", "/", "=", 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    
    var alphabets = ['M', 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L', " ", "-", "_", ".", "&","?", "!", "@", "#", "/", "=", 'm','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l', "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    
    var resultStr = [];
    for(let i=0; i<str.length; i++){
        for(let j =0; j<alphabets.length; j++){
            if(str[i] === alphabets[j]){
            resultStr.push(alphabets12[j]);
            } 
        }
    }
    return resultStr.join("");
  };



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("inputform");
    const unoutput = document.getElementById("outinputform");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const outType = document.getElementById("code");
    form.addEventListener("submit", function(e) {
        const oT = outType.value
            var alphabets =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', "-", "_", ".", "&","?", "!", "@", "#", "/", "="];
        if (oT == "encode") {
            var binary = ""
              for (var i = 0; i < input.value.length; i++) {
                   binary += input.value[i].charCodeAt(0).toString(2) + alphabets[Math.floor(Math.random() * alphabets.length)];
              }
              binary = encode_ascii85(binary)
              binary = alphabets[Math.floor(Math.random() * alphabets.length)] + btoa(binary) + "="
              binary = cipherRot12(binary)
              output.value = binary
              
        }
        if (oT == "decode") {
            var binary = input.value
            binary = binary.substring(1)
            binary = binary.substring(0, binary.length - 1)
            binary = cipherRotm12(binary)
            binary = atob(binary)
            binary = decode_ascii85(binary)
            var bin2 = ""
            for (var i = 0; i < binary.length; i++) {
                if (alphabets.indexOf(binary[i]) > -1) {
                    bin2 += " "
                    continue;
                }
                bin2 += binary[i]
            }
            binary = bin2
            var binString = '';
            binary.split(' ').map(function(bin) {
                binString += String.fromCharCode(parseInt(bin, 2));
            });
            binString = binString.substring(0, binString.length - 1)
            output.value = binString
        }
        e.preventDefault();
    });
        unoutput.addEventListener("submit", function(e) {
         output.select();
         output.setSelectionRange(0, 99999); 
          navigator.clipboard.writeText(output.value);
        e.preventDefault();
    });
    outType.addEventListener("change", function(e) {
        input.value = ""
    });
});


let map_scale = function (number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

let toByteArray = function (str) {
  let byteArray = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode <= 0xFF) {
      byteArray.push(charcode);
    }
  }
  return byteArray;
}

let fromByteArray = function (byteArray) {
  return String.fromCharCode.apply(String, byteArray);
}

let crc32 = function (data, value=0) {
  if (data instanceof Array) {
    data = fromByteArray(data);
  }
  let table = [];
  for(let entry, c = 0; c < 256; c++) {
    entry = c;
    for(let k = 0; k < 8; k++) {
      entry = 1 & entry ? 3988292384^entry >>> 1 : entry >>> 1;
    }
    table[c] = entry;
  }
  let n = -1 - value;
  for(let t = 0; t < data.length; t++) {
    n = n >>> 8^table[255 & (n^data.charCodeAt(t))];
  }
  return (-1 ^ n) >>> 0;
}

let zipLongest = function () {
    let args = [].slice.call(arguments);
    let longest = args.reduce(function(a,b){
        return a.length > b.length ? a : b
    }, []);

    return longest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

class struct {
    static lut = {
      "b": {u: DataView.prototype.getInt8, p: DataView.prototype.setInt8, bytes: 1},
      "B": {u: DataView.prototype.getUint8, p: DataView.prototype.setUint8, bytes: 1},
      "h": {u: DataView.prototype.getInt16, p: DataView.prototype.setInt16, bytes: 2},
      "H": {u: DataView.prototype.getUint16, p: DataView.prototype.setUint16, bytes: 2},
      "i": {u: DataView.prototype.getInt32, p: DataView.prototype.setInt32, bytes: 4},
      "I": {u: DataView.prototype.getUint32, p: DataView.prototype.setUint32, bytes: 4},
      "q": {u: DataView.prototype.getInt64, p: DataView.prototype.setInt64, bytes: 8},
      "Q": {u: DataView.prototype.getUint64, p: DataView.prototype.setUint64, bytes: 8},
    }

    static pack(...args) {
        let format = args[0];
        let pointer = 0;
        let data = args.slice(1);
        if (format.replace(/[<>]/, '').length != data.length) {
            throw("Pack format to Argument count mismatch");
            return;
        }
        let bytes = [];
        let littleEndian = true;
        for (let i = 0; i < format.length; i++) {
            if (format[i] == "<") {
                littleEndian = true;
            } else if (format[i] == ">") {
                littleEndian = false;
            } else {
                pushBytes(format[i], data[pointer]);
                pointer++;
            }
        }

        function pushBytes(formatChar, value) {
            if (!(formatChar in struct.lut)) {
                throw("Unhandled character '" + formatChar + "' in pack format");
            }
            let dataSize = struct.lut[formatChar].bytes;
            let view = new DataView(new ArrayBuffer(dataSize));
            let dataViewFn = struct.lut[formatChar].p.bind(view);
            dataViewFn(0, value, littleEndian);
            for (let i = 0; i < dataSize; i++) {
                bytes.push(view.getUint8(i));
            }
        }

        return bytes;
    };

    static unpack(format, bytes) {
        let pointer = 0;
        let data = [];
        let littleEndian = true;

        for (let c of format) {
            if (c == "<") {
                littleEndian = true;
            } else if (c == ">") {
                littleEndian = false;
            } else {
                pushData(c);
            }
        }

        function pushData(formatChar) {
            if (!(formatChar in struct.lut)) {
                throw("Unhandled character '" + formatChar + "' in unpack format");
            }
            let dataSize = struct.lut[formatChar].bytes;
            let view = new DataView(new ArrayBuffer(dataSize));
            for (let i = 0; i < dataSize; i++) {
              view.setUint8(i, bytes[pointer + i] & 0xFF);
            }
            let dataViewFn = struct.lut[formatChar].u.bind(view);
            data.push(dataViewFn(0, littleEndian));
            pointer += dataSize;
        }

        return data;
    };
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

Array.prototype.replaceAt = function(index, newArray) {
    return this.slice(0, index).concat(newArray).concat(this.slice(index + newArray.length));
};

let makeFileIterator = function* (content) {
    for (let line of content.split(/\r?\n/)) {
        yield line.trim();
    }
    return '';
}

let sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

let loadScript = (f) => {
    document.write(`<script src="${f}"></script>`);
};

let execScript = function (s) {
    let script;
    try {
        script = fetch(s);
    } catch (e) {
        console.warn(e);
    }
    if (script.status === 200) {
        try {
            eval(script.text());
            console.log("here...........");
        } catch (e) {
            console.warn(e);
        }
    } else {
        console.warn(script);
    }
};

let roughScale = function(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed * 100;
}

let trimColor = function (color) {
    color = color.replace('(', '');
    color = color.replace(')', '');
    return color;
}
let trimBrackets = function (value) {
    value = value.replace('(', '');
    value = value.replace(')', '');
    return value;
}
let trimFirstLastBrackets = function (value) {
    let temp = value;
    if (value.startsWith('(')) {
        temp = value.substring(1, value.length-1);
    }
    return temp;
}
function toHex(num) {
    let intnum = parseInt(num);
    let hex = intnum.toString(16);
    if(hex.length < 2) {
        hex = "0"+hex;
    }
    return hex;
}
let RGB2HEX = function(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
let HEX2RGB = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

let utils = {
    map: map_scale,
    toByteArray: toByteArray,
    exec: execScript,
    rough: roughScale,
    rgb2hex: RGB2HEX,
    hex2rgb: HEX2RGB
}
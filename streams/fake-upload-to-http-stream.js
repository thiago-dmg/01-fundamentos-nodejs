import { Readable } from 'node:stream'
import fetch from 'node-fetch';

class OneHundredStream extends Readable {
    index = 1;
    _read() {
        const i = this.index++;

     setTimeout(() => {
        if(i > 5) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))
            this.push(buf)
        }
     }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneHundredStream(),
    duplex: true,
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})
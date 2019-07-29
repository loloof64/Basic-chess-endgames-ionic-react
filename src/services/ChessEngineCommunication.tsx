const wasmSupported = typeof WebAssembly === 'object' &&
    WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
const stockfishVersion = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js');

console.log('wasm supported ?', wasmSupported);

const Stockfish = require(`../services/stockfish.js/${stockfishVersion}`);

export default class ChessEngineCommunication {
    private stockfishInstance = Stockfish();

    constructor(outputListener: (line: string) => void) {
        this.stockfishInstance = new Stockfish();
        this.stockfishInstance.addMessageListener(outputListener);
    }

    sendMessageToEngine = (input: string) => {
        this.stockfishInstance.postMessage(input);
    }
}
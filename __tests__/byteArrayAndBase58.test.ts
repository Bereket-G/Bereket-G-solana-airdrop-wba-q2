import bs58 from 'bs58'
import promptSync from 'prompt-sync';


const prompt = promptSync();

// #[test]
// fn base58_to_wallet() {
//     println!("Enter your name:");
//     let stdin = io::stdin();
//     let base58 = stdin.lock().lines().next().unwrap().unwrap(); //
// gdtKSTXYULQNx87fdD3YgXkzVeyFeqwtxHm6WdEb5a9YJRnHse7GQr7t5pbepsyvUCk7VvksUGhPt4SZ8JHVSkt
//     let wallet = bs58::decode(base58).into_vec().unwrap();
//     println!("{:?}", wallet);
// }

export function wallet_to_base58(){
    const walletInput: string = prompt('Enter your wallet address:');

    const base58Decoded: Uint8Array = bs58.decode(walletInput);

    console.log(`[${base58Decoded}]`);
}


export function base58_to_walletAddress(){
    let walletInput: string = prompt('Enter base58 encoded representation:');

    // trim the brackets if exist
    walletInput = walletInput.replace(/[\[\]]/g, "");

    const walletInputAsArray: number[] = (walletInput.split(",")).map(x => parseInt(x));

    const base58Encoded = bs58.encode(walletInputAsArray);

    console.log(`${base58Encoded}`);
}
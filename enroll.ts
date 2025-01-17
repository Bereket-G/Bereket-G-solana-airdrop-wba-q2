import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js";
import { WbaPrereq } from "./programs/types";
import { IDL } from "./programs/wba_prereq";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";

import wallet from "./wba-wallet.json";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("Bereket-G", "utf8");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

// Create our program
// @ts-ignore
// const program = new Program<WbaPrereq>(
//   IDL,
//   "WBA52hW35HZU5R2swG57oehbN2fTr7nNhNDgfjnqUoZ" as Address,
//   provider
// );

// Create our program
const program: Program<WbaPrereq> = new Program(IDL, provider);

//WBA52hW35HZU5R2swG57oehbN2fTr7nNhNDgfjnqUoZ

// Create the PDA for our enrollment account
// const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
// const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
//   enrollment_seeds,
//   program.programId
// );

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Execute our enrollment transaction
// (async () => {
//   try {
//     const txhash = await program.methods
//       .complete(github)
//       .accounts({
//         signer: keypair.publicKey,
//         prereq: enrollment_key,
//         systemProgram: SystemProgram.programId,
//       })
//       .signers([keypair])
//       .rpc();
//     console.log(`Success! Check out your TX here:
//         https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

// Execute our enrollment transaction
(async () => {
  try {
    const txhash = await program.methods
      .update(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        systemProgram: SystemProgram.programId,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

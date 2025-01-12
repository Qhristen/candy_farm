// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CandyfarmIDL from '../target/idl/candyfarm.json'
import type { Candyfarm } from '../target/types/candyfarm'

// Re-export the generated IDL and type
export { Candyfarm, CandyfarmIDL }

// The programId is imported from the program IDL.
export const Candyfarm_PROGRAM_ID = new PublicKey(CandyfarmIDL.address)

// This is a helper function to get the Candyfarm Anchor program.
export function getCandyfarmProgram(provider: AnchorProvider) {
  return new Program(CandyfarmIDL as Candyfarm, provider)
}

// This is a helper function to get the program ID for the Candyfarm program depending on the cluster.
export function getCandyfarmProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Candyfarm program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return Candyfarm_PROGRAM_ID
  }
}

import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Candyfarm} from '../target/types/candyfarm'

describe('candyfarm', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Candyfarm as Program<Candyfarm>

  const candyfarmKeypair = Keypair.generate()

  it('Initialize Candyfarm', async () => {
    await program.methods
      .initialize()
      .accounts({
        candyfarm: candyfarmKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([candyfarmKeypair])
      .rpc()

    const currentCount = await program.account.candyfarm.fetch(candyfarmKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment candyfarm', async () => {
    await program.methods.increment().accounts({ candyfarm: candyfarmKeypair.publicKey }).rpc()

    const currentCount = await program.account.candyfarm.fetch(candyfarmKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment candyfarm Again', async () => {
    await program.methods.increment().accounts({ candyfarm: candyfarmKeypair.publicKey }).rpc()

    const currentCount = await program.account.candyfarm.fetch(candyfarmKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement candyfarm', async () => {
    await program.methods.decrement().accounts({ candyfarm: candyfarmKeypair.publicKey }).rpc()

    const currentCount = await program.account.candyfarm.fetch(candyfarmKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set candyfarm value', async () => {
    await program.methods.set(42).accounts({ candyfarm: candyfarmKeypair.publicKey }).rpc()

    const currentCount = await program.account.candyfarm.fetch(candyfarmKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the candyfarm account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        candyfarm: candyfarmKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.candyfarm.fetchNullable(candyfarmKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})

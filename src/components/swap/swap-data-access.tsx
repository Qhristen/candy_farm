// 'use client'

// import {getCandyfarmProgram, getCandyfarmProgramId} from '@project/anchor'
// import {useConnection} from '@solana/wallet-adapter-react'
// import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
// import {useMutation, useQuery} from '@tanstack/react-query'
// import {useMemo} from 'react'
// import toast from 'react-hot-toast'
// import {useCluster} from '../cluster/cluster-data-access'
// import {useAnchorProvider} from '../solana/solana-provider'
// import {useTransactionToast} from '../ui/ui-layout'

// export function useCandyfarmProgram() {
//   const { connection } = useConnection()
//   const { cluster } = useCluster()
//   const transactionToast = useTransactionToast()
//   const provider = useAnchorProvider()
//   const programId = useMemo(() => getCandyfarmProgramId(cluster.network as Cluster), [cluster])
//   const program = getCandyfarmProgram(provider)

//   const accounts = useQuery({
//     queryKey: ['Candyfarm', 'all', { cluster }],
//     queryFn: () => program.account.candyfarm.all(),
//   })

//   const getProgramAccount = useQuery({
//     queryKey: ['get-program-account', { cluster }],
//     queryFn: () => connection.getParsedAccountInfo(programId),
//   })

//   const initialize = useMutation({
//     mutationKey: ['Candyfarm', 'initialize', { cluster }],
//     mutationFn: (keypair: Keypair) =>
//       program.methods.initialize().accounts({ candyfarm: keypair.publicKey }).signers([keypair]).rpc(),
//     onSuccess: (signature) => {
//       transactionToast(signature)
//       return accounts.refetch()
//     },
//     onError: () => toast.error('Failed to initialize account'),
//   })

//   return {
//     program,
//     programId,
//     accounts,
//     getProgramAccount,
//     initialize,
//   }
// }

// export function useCandyfarmProgramAccount({ account }: { account: PublicKey }) {
//   const { cluster } = useCluster()
//   const transactionToast = useTransactionToast()
//   const { program, accounts } = useCandyfarmProgram()

//   const accountQuery = useQuery({
//     queryKey: ['Candyfarm', 'fetch', { cluster, account }],
//     queryFn: () => program.account.candyfarm.fetch(account),
//   })

//   const closeMutation = useMutation({
//     mutationKey: ['Candyfarm', 'close', { cluster, account }],
//     mutationFn: () => program.methods.close().accounts({ candyfarm: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx)
//       return accounts.refetch()
//     },
//   })

//   const decrementMutation = useMutation({
//     mutationKey: ['Candyfarm', 'decrement', { cluster, account }],
//     mutationFn: () => program.methods.decrement().accounts({ candyfarm: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx)
//       return accountQuery.refetch()
//     },
//   })

//   const incrementMutation = useMutation({
//     mutationKey: ['Candyfarm', 'increment', { cluster, account }],
//     mutationFn: () => program.methods.increment().accounts({ candyfarm: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx)
//       return accountQuery.refetch()
//     },
//   })

//   const setMutation = useMutation({
//     mutationKey: ['Candyfarm', 'set', { cluster, account }],
//     mutationFn: (value: number) => program.methods.set(value).accounts({ candyfarm: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx)
//       return accountQuery.refetch()
//     },
//   })

//   return {
//     accountQuery,
//     closeMutation,
//     decrementMutation,
//     incrementMutation,
//     setMutation,
//   }
// }

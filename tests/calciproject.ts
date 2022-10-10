const assert = require('assert')
const anchor = require('@project-serum/anchor');
const AnchorProvider = require('@project-serum/anchor')
// const provider = AnchorProvider.local()
const {SystemProgram} = anchor.web3
describe('calciproject', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Calciproject

    it('Creates a Caculator', async() => {
        await program.rpc.create("Welcome to My App with Solana and JS", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome to My App with Solana and JS")
    })
    it("Adds Two Numbers", async() => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(5)))
    })
    it("Subtracts Two Numbers", async() => {
        await program.rpc.sub(new anchor.BN(5), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(3)))
    })
    it("Multiplies Two Numbers", async() => {
        await program.rpc.mul(new anchor.BN(5), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(10)))
    })
    it("Divides Two Numbers", async() => {
        await program.rpc.div(new anchor.BN(5), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(2)))
        assert.ok(account.remainder.eq(new anchor.BN(1)))
    })
})
import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = accounts.find((account) => account.id === id)

    res.status(200).send(result)
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const indexToDelete = accounts.findIndex((account) => account.id === id)

    if (indexToDelete !== -1) {
        accounts.splice(indexToDelete, 1)
    } else {
        console.log("O item não existe");
    }

    res.status(200).send({ mensage: 'O item foi deletado com sucesso' })
})

app.put("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account) => account.id === id)

    account.ownerName = newOwnerName || account.ownerName
    account.type = newType || account.type
    account.balance = isNaN(newBalance) ? account.balance : newBalance
    // assim por ser number


    res.status(200).send({ mensage: 'Item alterado com sucesso' })
})


import express, { Request, Response } from "express";
import cors from "cors";
import { accounts } from "./database";
import { ACCOUNT_TYPE, TAccount } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/accounts", (req: Request, res: Response) => {
  res.send(accounts);
});

// getAccountById
app.get("/accounts/:id", (req: Request, res: Response) => {
  const idToFind = req.params.id;

  const result: TAccount = accounts.find((account) => {
    return account.id === idToFind;
  });

  res.send(result);
});

// deleteAccount
app.delete("/accounts/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;

  const index: number = accounts.findIndex((account) => account.id === idToDelete);

  if (index >= 0) {
    accounts.slice(index, 1);
  }
  res.status(200).send("Item deletado com sucesso");
});

// putAccount
app.put ("/accounts/:id" , (req: Request, res: Response) => {
    const idToEdit = req. params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined
    const newBalance = req.body.balance as number | undefined

    const result = accounts.find((account) => account.id === idToEdit)

    if (result) {
        result.id = newId || result.id
        result.ownerName = newOwnerName || result.ownerName
        result.type = newType || result.type
        result.balance = isNaN(Number(newBalance)) ? result.balance : newBalance as number
    }

    res.status(200).send("Atualização realizada com sucesso")
})

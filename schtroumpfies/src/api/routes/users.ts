import { Router, Request, Response } from "express";
const router = Router()
// Getting all users
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

// Getting one user by id
router.get('/:id', (req: Request, res: Response) => {
  res.send(req.params.id)
})

// Create a new user
router.post('/', (req: Request, res: Response) => {
  res.send('Hello New World')
})

// Update a user
router.patch('/users/:id', (req: Request, res: Response) => {
  res.send('Later World')
})

// Delete a user
router.delete('/users/:id', (req: Request, res: Response) => {
  res.send('Bye World')
})
module.exports = router;

import { user } from "./testObject";
export default function handler(req, res) {
  console.log('REQUEST', req.body)
  console.log(user, "user")
  return res.status(200).json(user);
}
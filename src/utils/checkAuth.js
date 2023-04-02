import jwt from 'jsonwebtoken';

export async function checkAuth (req, res, next) {
   try{
      const token = (req.headers.authorization ||'').replace(/Bearer\s?/,'')
      if (!token) {
         return res.status(400).json({message:'Вы не авторизованы'})
      }
      const id = jwt.decode(token, 'vanusha12')
      req.id =id
      next()
   }
   catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Не удалось проверить авторизацию' });
    }

}
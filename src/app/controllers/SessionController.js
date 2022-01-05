import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth'

import Usuarios from '../models/Usuarios';

var model = Usuarios;

class SessionController {
  async store(req, res) {
    const { email, password } = await req.body;

    const usuario = await model.findOne({ where: { email } })

    if (!usuario) {
      return res.status(401).json({ error: 'User not found.' })
    }

    if (!(await usuario.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' })
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id, nome, email,
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn, })
    })
  }


}

export default new SessionController();
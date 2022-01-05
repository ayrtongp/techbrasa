import * as Yup from 'yup';
import Usuarios from '../models/Usuarios';

var model = Usuarios

class UsuariosController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const usuarioExists = await model.findOne({
      where: {
        email: req.body.email,
      }
    })

    if (usuarioExists) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    const createUsuario = await model.create(req.body)

    return res.json(createUsuario)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    if (req.body.oldPassword) {
      if (!req.body.password) {
        return res.status(400).json({ error: 'Missing password' })
      }
    }

    const { email, oldPassword } = req.body;

    const usuario = await model.findByPk(req.usuarioId);

    // Check Email
    if (email != usuario.email) {
      const usuarioExists = await model.findOne({
        where: {
          email
        }
      })

      if (usuarioExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    // Check old password
    if (oldPassword && !(await usuario.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' })
    }

    const { id, nome } = await usuario.update(req.body)

    return res.json({
      id, nome, email
    })
  }


}

export default new UsuariosController();
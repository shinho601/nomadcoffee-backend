import client from '../../client'
import bcrypt from 'bcrypt'

interface IParams {
  username: string
  email: string
  name: string
  location?: string
  avatarURL?: string
  githubUsername?: string
  password: string
}

export default {
  Mutation: {
    createAccount: async (
      _: any,
      {
        username,
        email,
        name,
        location,
        avatarURL,
        githubUsername,
        password,
      }: IParams
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        })

        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }

        const uglyPassword = await bcrypt.hash(password, 10)
        const newUser = client.user.create({
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            password: uglyPassword,
          },
        });
        return {ok: true, user: newUser};
      }
      catch(e: any) {
        return {ok: false, error: e.message}
      }      
    },
  },
}

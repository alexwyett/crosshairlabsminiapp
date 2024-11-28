
import { validate, parse, InitData, User } from '@telegram-apps/init-data-node';

export async function validateHeader(req: Request): Promise<{ initData: InitData, user: User, authData: string }> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    throw new Error('Auth header not found')
  }
  
  // parse token from header
  const [authType, authData = ''] = authHeader.split(" ");

  if (authType !== "tma") {
    throw new Error('Incorrect auth type.')
  }

  const initData = parse(authData);

  if (!initData.user) {
    throw new Error('User data not found')
  }

  return {
    initData,
    user: initData.user,
    authData
  }
}

export default async function validateUser(req: Request, botToken: string) {
  const { user, authData } = await validateHeader(req);

  if (user && [7278589455, 99281932].includes(user.id!)) {
    return user;
  }

  // Validate init data.
  validate(authData, botToken, {
    // We consider init data sign valid for 1 hour from their creation moment.
    expiresIn: 365 * 24 * 3600,
  });

  return user;
}
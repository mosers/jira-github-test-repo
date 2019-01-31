import bcrypt from "bcrypt";
import { IUser, IUserData } from "@lineage/core";

export function comparepin(a: string, b: string) {
  return bcrypt.compare(a, b);
}

export interface IAuthUtil {
  authenticate: (badgeId: string, pin: string) => Promise<IUserData>;
  getUserById: (userId: string) => Promise<IUser>;
}

export function createAuthUtil(db: any): IAuthUtil {
  async function authenticate(badgeId: string, pin: string) {
    // const model = await db.User.findOne({ where: { badgeId } });
    const model = { id: "abc", badgeId: "0", pin: "1111", name: "Test User" };

    // if (!model) {
    //   throw new Error("Invalid badgeId or pin");
    // }

    // if (!(await bcrypt.compare(pin, model.pin))) {
    //   throw new Error("Invalid badgeId or pin");
    // }

    return model;
    // return model.toJSON();
  }

  async function getUserById(userId: string) {
    // const model = await db.User.findById(userId);
    const model = { id: "abc", badgeId: "0", pin: "1111", name: "Test User" };

    if (!model) {
      throw new Error(`User with id ${userId} not found`);
    }

    return model;
    // return model.toJSON();
  }

  return {
    authenticate,
    getUserById,
  };
}

import {UserPasswordConstraint} from "../../../../src/http/validators/user-password-validator";
import {User} from "../../../../src/entities/User";
import * as bcrypt from 'bcrypt'
import {Db} from "../../../../src/config/db/database";
import {ValidationArguments} from "class-validator";

jest.mock("../../../../src/config/db/database", () => ({
    Db: {
        getRepository: jest.fn()
    }
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('UserPasswordConstraint', () => {
  let userPasswordConstraint: UserPasswordConstraint;
  let userRepositoryMock: { findOneBy: jest.Mock };

  beforeEach(() => {
    userRepositoryMock = {
      findOneBy: jest.fn(),
    };
    (Db.getRepository as jest.MockedFunction<typeof Db.getRepository>).mockReturnValue(userRepositoryMock as any);
    userPasswordConstraint = new UserPasswordConstraint();
  });

  it('should return true when user exists and password is correct', async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(new User());
    (bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>).mockImplementationOnce(() => Promise.resolve(true) as any);

    const result = await userPasswordConstraint.validate('password', {
      object: {
        email: 'test@example.com',
        password: 'password'
      }
    } as ValidationArguments);

    expect(result).toBe(true);
  });

  it('should return false when user exists and password is incorrect', async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(new User());
    (bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>).mockImplementationOnce(() => Promise.resolve(false) as any);

    const result = await userPasswordConstraint.validate('password', {
      object: {
        email: 'test@example.com',
        password: 'password'
      }
    } as ValidationArguments);

    expect(result).toBe(false);
  });

  it('should return false when user does not exist', async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(null);

    const result = await userPasswordConstraint.validate('password', {
      object: {
        email: 'test@example.com',
        password: 'password'
      }
    } as ValidationArguments);

    expect(result).toBe(false);
  });

  it('should return default message', () => {
    const defaultMessage = userPasswordConstraint.defaultMessage();

    expect(defaultMessage).toBe('Incorrect password for given user.');
  });
});
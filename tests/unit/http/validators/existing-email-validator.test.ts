import { UnusedEmailConstraint } from '../../../../src/http/validators/unused-email-validator'
import { Db } from '../../../../src/config/db/database'
import { User } from '../../../../src/entities/User'

jest.mock('../../../../src/config/db/database', () => ({
  Db: {
    getRepository: jest.fn(),
  },
}))

describe('EmailExistsConstraint', () => {
  let emailExistsConstraint: UnusedEmailConstraint
  let userRepositoryMock: { findOneBy: jest.Mock }

  beforeEach(() => {
    userRepositoryMock = {
      findOneBy: jest.fn(),
    }
    ;(Db.getRepository as jest.MockedFunction<typeof Db.getRepository>).mockReturnValue(userRepositoryMock as any)

    emailExistsConstraint = new UnusedEmailConstraint()
  })

  afterEach(() => jest.clearAllMocks())

  it('should return false when user exists', async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(new User())

    const result = await emailExistsConstraint.validate('test@example.com')

    expect(result).toBe(false)
  })

  it('should return true when user does not exist', async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(null)

    const result = await emailExistsConstraint.validate('test@example.com')

    expect(result).toBe(true)
  })

  it('should return default message', () => {
    const defaultMessage = emailExistsConstraint.defaultMessage()

    expect(defaultMessage).toBe('Email $value already exists in the database.')
  })
})

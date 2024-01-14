import { Request, Response, NextFunction } from 'express';
import {RequestDtoInterface} from "../../../../src/http/requests/interfaces/request-dto-interface";
import {validateRequest} from "../../../../src/http/middlewares/validation-middleware";
import {validate, ValidationError} from "class-validator";

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

describe('validateRequest middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let dto: { new (...args: any[]): RequestDtoInterface };

  beforeEach(() => {
    dto = jest.fn().mockImplementation(() => ({})) as any;
    mockReq = {
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => jest.clearAllMocks())

  it('should call next function when there are no validation errors', async () => {
    (validate as jest.MockedFunction<typeof validate>).mockResolvedValue([]);

    await validateRequest(dto, mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('should return validation errors when they exist', async () => {
    const mockErrors = [{
      constraints: {
        field: 'error message'
      }
    }];

    (validate as jest.MockedFunction<typeof validate>).mockResolvedValue(mockErrors as unknown as ValidationError[]);

    await validateRequest(dto, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Validation failure',
      constraints: mockErrors.map((error) => error.constraints),
    });
  });
});
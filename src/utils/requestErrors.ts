enum RequestErrorCode {
  DefaultError = 0,
  UnkownError = 1,
  PasswordFormatError = 1001,
  EmailFormatError = 1002,
  EmailExistsError = 1003,
  UsernameExistsError = 1004,
  UsernameFormatError = 1005,
  UniversityNotFoundError = 1006,
  AvatarSizeError = 1007,
  IncorrectPasswordError = 1008,
  OpenIDNotFoundError = 1009,
  UserExistsError = 1010,
  UserNotFoundError = 1011,
  EmailNotFoundError = 1012,
}

class RequestError extends Error {
  code: RequestErrorCode;
  constructor(message: string, code: RequestErrorCode) {
    super(message);
    this.code = code;
  }
}

class RequiredError extends RequestError {
  constructor() {
    super("required.", RequestErrorCode.DefaultError);
  }
}

class BlankError extends RequestError {
  constructor() {
    super("blank.", RequestErrorCode.DefaultError);
  }
}

class NullError extends RequestError {
  constructor() {
    super("null.", RequestErrorCode.DefaultError);
  }
}

class UnkownError extends RequestError {
  constructor() {
    super("unkown error.", RequestErrorCode.UnkownError);
  }
}

class PasswordFormatError extends RequestError {
  constructor() {
    super(
      "Password must be 6-20 characters long and contain at least two of the following: letters, numbers, special characters.",
      RequestErrorCode.PasswordFormatError
    );
  }
}

class EmailFormatError extends RequestError {
  constructor() {
    super("Email format is incorrect.", RequestErrorCode.EmailFormatError);
  }
}

class EmailExistsError extends RequestError {
  constructor() {
    super("Email already exists.", RequestErrorCode.EmailExistsError);
  }
}

class UsernameExistsError extends RequestError {
  constructor() {
    super("Username already exists.", RequestErrorCode.UsernameExistsError);
  }
}

class UsernameFormatError extends RequestError {
  constructor() {
    super(
      "Username must be 6-20 characters long and contain only valid characters.",
      RequestErrorCode.UsernameFormatError
    );
  }
}

class UniversityNotFoundError extends RequestError {
  constructor() {
    super("University not found.", RequestErrorCode.UniversityNotFoundError);
  }
}

class AvatarSizeError extends RequestError {
  constructor() {
    super(
      "Avatar size must be between 0 and 2MB.",
      RequestErrorCode.AvatarSizeError
    );
  }
}

class IncorrectPasswordError extends RequestError {
  constructor() {
    super("Incorrect password.", RequestErrorCode.IncorrectPasswordError);
  }
}

class OpenIDNotFoundError extends RequestError {
  constructor() {
    super("Failed to get openid.", RequestErrorCode.OpenIDNotFoundError);
  }
}

class UserExistsError extends RequestError {
  constructor() {
    super("User already exists.", RequestErrorCode.UserExistsError);
  }
}

class UserNotFoundError extends RequestError {
  constructor() {
    super("User does not exist.", RequestErrorCode.UserNotFoundError);
  }
}

class EmailNotFoundError extends RequestError {
  constructor() {
    super("Email does not exist.", RequestErrorCode.EmailNotFoundError);
  }
}

const aueduErrors = {
  blank: new BlankError(),
  null: new NullError(),
  required: new RequiredError(),
  1001: new PasswordFormatError(),
  1002: new EmailFormatError(),
  1003: new EmailExistsError(),
  1004: new UsernameExistsError(),
  1005: new UsernameFormatError(),
  1006: new UniversityNotFoundError(),
  1007: new AvatarSizeError(),
  1008: new IncorrectPasswordError(),
  1009: new OpenIDNotFoundError(),
  1010: new UserExistsError(),
  1011: new UserNotFoundError(),
  1012: new EmailNotFoundError(),
};

const ErrorHandler = (res: any) => {
  if (res.data.errors) {
    const errors = res.data.errors;
    errors.forEach((error: { code: string | number }) => {
      if (aueduErrors.hasOwnProperty(error.code)) {
        throw aueduErrors[error.code as keyof typeof aueduErrors];
      } else {
        throw new UnkownError();
      }
    });
  } else {
    throw new UnkownError();
  }
};
export { ErrorHandler };

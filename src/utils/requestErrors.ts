enum RequestErrorCode {
  DefaultError = 1000,
  NotAuthenticatedError = 1001,
  NoPermissionError = 1002,
  ServerNetworkError = 1003,
  UnitNotFoundError = 1004,
  CourseNotFoundError = 1005,
  ICSFileFormatError = 1006,
  UserNotFoundError = 1007,
  PasswordFormatError = 1008,
  EmailFormatError = 1009,
  EmailExistsError = 1010,
  UsernameExistsError = 1011,
  UsernameFormatError = 1012,
  IncorrectPasswordError = 1013,
  OpenIDNotFoundError = 1014,
  UserExistsError = 1015,
  EmailNotFoundError = 1016,
  EmailVerificationCodeError = 1017,
  EmailVerificationCodeExpiredError = 1018,
  EmailVerificationCodeSentError = 1019,
  EmailNotVerifiedError = 1020,
  LanguageNotSupportedError = 1021,
  VerificationTypeNotSupportedError = 1022,
  FieldNotProvidedError = 1023,
  UniversityNotFoundError = 1024,
  AvatarSizeError = 1025,
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

class errorError extends RequestError {
  constructor() {
    super("error", RequestErrorCode.DefaultError);
  }
}

class UnkownError extends RequestError {
  constructor() {
    super(
      "Unkown error. Please contact with admin",
      RequestErrorCode.DefaultError
    );
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

class NotAuthenticatedError extends RequestError {
  constructor() {
    super("Not authenticated.", RequestErrorCode.NotAuthenticatedError);
  }
}

class NoPermissionError extends RequestError {
  constructor() {
    super("No permission.", RequestErrorCode.NoPermissionError);
  }
}

class EmailVerificationCodeError extends RequestError {
  constructor() {
    super(
      "Email verification code is incorrect.",
      RequestErrorCode.EmailVerificationCodeError
    );
  }
}

class EmailVerificationCodeExpiredError extends RequestError {
  constructor() {
    super(
      "Email verification code has expired.",
      RequestErrorCode.EmailVerificationCodeExpiredError
    );
  }
}

class EmailVerificationCodeSentError extends RequestError {
  constructor() {
    super(
      "Email verification code has been sent. Please try again in 1 minute.",
      RequestErrorCode.EmailVerificationCodeSentError
    );
  }
}

class EmailNotVerifiedError extends RequestError {
  constructor() {
    super("Email not verified.", RequestErrorCode.EmailNotVerifiedError);
  }
}

class LanguageNotSupportedError extends RequestError {
  constructor() {
    super(
      "Language not supported.",
      RequestErrorCode.LanguageNotSupportedError
    );
  }
}

class VerificationTypeNotSupportedError extends RequestError {
  constructor() {
    super(
      "Verification type not supported.",
      RequestErrorCode.VerificationTypeNotSupportedError
    );
  }
}

class FieldNotProvidedError extends RequestError {
  constructor() {
    super("This field is required.", RequestErrorCode.FieldNotProvidedError);
  }
}

class UnitNotFoundError extends RequestError {
  constructor() {
    super("Unit not found.", RequestErrorCode.UnitNotFoundError);
  }
}

class CourseNotFoundError extends RequestError {
  constructor() {
    super("Course not found.", RequestErrorCode.CourseNotFoundError);
  }
}

class ICSFileFormatError extends RequestError {
  constructor() {
    super("ICS file format error.", RequestErrorCode.ICSFileFormatError);
  }
}

const aueduErrors = {
  blank: new BlankError(),
  null: new NullError(),
  required: new RequiredError(),
  error: new errorError(),
  [RequestErrorCode.DefaultError]: new UnkownError(),
  [RequestErrorCode.NotAuthenticatedError]: new NotAuthenticatedError(),
  [RequestErrorCode.NoPermissionError]: new NoPermissionError(),
  [RequestErrorCode.ServerNetworkError]: new UnkownError(),
  [RequestErrorCode.UnitNotFoundError]: new UnitNotFoundError(),
  [RequestErrorCode.CourseNotFoundError]: new CourseNotFoundError(),
  [RequestErrorCode.ICSFileFormatError]: new ICSFileFormatError(),
  [RequestErrorCode.UserNotFoundError]: new UserNotFoundError(),
  [RequestErrorCode.PasswordFormatError]: new PasswordFormatError(),
  [RequestErrorCode.EmailFormatError]: new EmailFormatError(),
  [RequestErrorCode.EmailExistsError]: new EmailExistsError(),
  [RequestErrorCode.UsernameExistsError]: new UsernameExistsError(),
  [RequestErrorCode.UsernameFormatError]: new UsernameFormatError(),
  [RequestErrorCode.IncorrectPasswordError]: new IncorrectPasswordError(),
  [RequestErrorCode.OpenIDNotFoundError]: new OpenIDNotFoundError(),
  [RequestErrorCode.UserExistsError]: new UserExistsError(),
  [RequestErrorCode.EmailNotFoundError]: new EmailNotFoundError(),
  [RequestErrorCode.EmailVerificationCodeError]: new EmailVerificationCodeError(),
  [RequestErrorCode.EmailVerificationCodeExpiredError]: new EmailVerificationCodeExpiredError(),
  [RequestErrorCode.EmailVerificationCodeSentError]: new EmailVerificationCodeSentError(),
  [RequestErrorCode.EmailNotVerifiedError]: new EmailNotVerifiedError(),
  [RequestErrorCode.LanguageNotSupportedError]: new LanguageNotSupportedError(),
  [RequestErrorCode.VerificationTypeNotSupportedError]: new VerificationTypeNotSupportedError(),
  [RequestErrorCode.FieldNotProvidedError]: new FieldNotProvidedError(),
  [RequestErrorCode.UniversityNotFoundError]: new UniversityNotFoundError(),
  [RequestErrorCode.AvatarSizeError]: new AvatarSizeError(),
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
export { ErrorHandler, RequestError, RequestErrorCode };

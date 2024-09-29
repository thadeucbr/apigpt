const mockMongooseResponse = {
  _id: "60f5b6d5c30e4e001f8c5e70",
  name: "Thadeu",
  mobile: "11971704940",
  birthDate: "1992-07-07T00:00:00.000Z", // ISO format
  password: "asdfasdsaf",
  createdAt: "2023-10-01T12:00:00.000Z",
  updatedAt: "2023-10-01T12:00:00.000Z",
  __v: 0
};

const mockMongooseError = {
  name: "ValidationError",
  message: "User validation failed: mobile: Path `mobile` is required.",
  errors: {
    mobile: {
      kind: "required",
      path: "mobile",
      value: undefined,
      message: "Path `mobile` is required."
    }
  }
};

// Simulating a Mongoose create operation
const createUser = async (userData) => {
  // Mocking the creation of a user
  return mockMongooseError;
};

export default createUser;
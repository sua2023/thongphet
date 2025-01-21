export const httpHandlers = (statusCode: Number) => {
  switch (statusCode) {
    case 200:
      return { message: "Success", status: statusCode };
    case 201:
      return { message: "Create success", status: statusCode };
    case 400:
      return { message: "Create failed", status: statusCode };
    case 401:
      return { message: "Unauthorized", status: statusCode };
    case 403:
      return { message: "Permission denied", status: statusCode };
    case 404:
      return { message: "Not Found", status: statusCode };
    case 409:
      return { message: "Already exist", status: statusCode };
    case 500:
      return { message: "Internal Server Error", status: statusCode };
    default:
      return { message: "Something went wrong", status: 101 };
  }
};

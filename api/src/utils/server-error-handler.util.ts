// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serverErrorHandler = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("Elevated privileges required.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export default serverErrorHandler;

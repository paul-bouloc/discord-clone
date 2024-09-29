const serverErrorHandler = (error:any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('Elevated privileges required.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error('Port is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

export default serverErrorHandler;
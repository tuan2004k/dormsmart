import { info } from '../utils/logger.js'; // Import info logger

export const authorize = (allowedRoles) => {
    info(`AuthorizeMiddleware: Initializing with allowed roles: ${allowedRoles.join(', ')}`);
    return (req, res, next) => {
      console.log(`Authorize middleware: User role is ${req.user?.role}, Allowed roles: ${allowedRoles.join(', ')}`); // Add this line
      const userRole = req.user?.role;
      if (!userRole) {
        // info('AuthorizeMiddleware: No user role found in req.user, sending 403');
       return res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
      }
      // info(`AuthorizeMiddleware: User role: ${userRole}, checking against allowed roles: ${allowedRoles.join(', ')}`);
      if (!allowedRoles.includes(userRole)) {
        // info('AuthorizeMiddleware: User role not authorized, sending 403');
        return res.status(403).json({ 
          message: 'Bạn không có quyền truy cập tài nguyên này' 
        });
      }
      // info('AuthorizeMiddleware: User authorized, calling next()');
      next();  
    };
  };
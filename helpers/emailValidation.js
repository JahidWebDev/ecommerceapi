function emailValidation(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return false;
    }
  
    // More robust regex pattern
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return pattern.test(trimmedEmail);
  }
  
  module.exports = emailValidation;
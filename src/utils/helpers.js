export const maskEmail = (email) => {
  if (!email) return "";
  const [user, domain] = email.split("@");
  const maskedUser =
    user.length > 2
      ? user[0] + "*".repeat(user.length - 2) + user[user.length - 1]
      : user[0] + "*";
  return `${maskedUser}@${domain}`;
};

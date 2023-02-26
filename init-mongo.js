db.createUser({
  user: "User",
  pwd: "Password",
  roles: [
    {
      role: "readWrite",
      db: "daily-trends",
    },
  ],
});

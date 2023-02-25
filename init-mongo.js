db.createUser({
    user: "Username",
    pwd: "Password",
    roles: [
      {
        role: "readWrite",
        db: "daily-trends",
      },
    ],
  });
  
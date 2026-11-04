import bcrypt from "bcryptjs";

const passwordHash = await bcrypt.hash("xxxx@xxxx", 10);

console.log(passwordHash);

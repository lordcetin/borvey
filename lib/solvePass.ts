/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
// const bcrypt = require("bcryptjs");
import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password:any,hashedPass:any) => {
  let solve = await bcrypt.compare(
    password, 
    hashedPass
  );
  return solve
}
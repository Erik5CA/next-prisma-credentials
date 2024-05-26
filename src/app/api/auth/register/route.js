const { NextResponse } = require("next/server");
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data);

    const foundUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (foundUser) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }
    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

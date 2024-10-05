import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db"; // Corrected import
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connect(); // Use the correct function name
  const { clerkId, email, firstName, lastName, profileImage } =
    await req.json();

  try {
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = new User({
      clerkId,
      email,
      firstName,
      lastName,
      profileImage,
    });

    console.log("Request received:", req);
    console.log("Parsed JSON:", {
      clerkId,
      email,
      firstName,
      lastName,
      profileImage,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

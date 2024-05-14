"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session.user.id),
      amount: amount * 100,
    },
  });

  const balance = await prisma.balance.findUnique({
    where: { userId: Number(session.user.id) },
  });

  // TODO: to be removed from here to the place where we verify that bank has captured the request
  await prisma.balanceAudit.create({
    data: {
      userId: Number(session.user.id),
      Balance: balance?.amount ? balance.amount + amount * 100 : amount * 100,
      date: new Date(),
    },
  });

  return {
    message: "Done",
  };
}

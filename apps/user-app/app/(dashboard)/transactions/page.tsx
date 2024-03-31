"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { TransactionTable } from "../../../components/TransactionTable";

async function getp2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },
      toUser: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return txns.map((t: any) => ({
    fromUserId: t.fromUserId,
    fromUserName: t.fromUser.name || "",
    toUserId: t.toUserId,
    toUserName: t.toUser.name || "",
    loggedInUserId: Number(session.user.id),
    timestamp: t.timestamp,
    amount: t.amount || 0,
  }));
}

export default async function () {
  const transactions = await getp2pTransactions();
  return (
    <div>
      <TransactionTable transactions={transactions} />
    </div>
  );
}

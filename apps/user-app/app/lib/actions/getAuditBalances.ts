"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { massageAuditData } from "../util/util";

export const getAuditBalances = async () => {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const auditData = await prisma.balanceAudit.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      date: "desc",
    },
  });

  const chartData = massageAuditData(auditData);
  console.log(chartData);

  return chartData;
};

/* eslint-disable prefer-const */
'use server'
import prismadb from '@/lib/prismadb'

export const updateFreelancerStats = async (firmId: string,receiverId:string) => {

  // Freelancer'ın tüm gig'lerini al
  const gigs = await prismadb.firm.findMany({
    where: { id:firmId },
    include: {
      offers: {
        where: { status: 'success' }, // Tamamlanmış siparişler
      },
    },
  });

  if (!gigs || gigs.length === 0) {
    throw new Error("No gigs found for this freelancer");
  }

  // Tamamlanmış sipariş sayısı ve yıldız ortalamasını hesapla
  let totalCompletedOrders = 0;
  let totalStars = 0;
  let totalGigCount = gigs?.length;

  gigs.forEach((gig) => {
    const completedOrders = gig.offers.length;
    const averageStars = parseFloat(gig.stars) || 0;

    totalCompletedOrders += completedOrders;
    totalStars += averageStars;
  });

  const firmStars = totalStars / totalGigCount;

  // Freelancer'ın seviyesini belirle
  let newLevel = 1;
  if (totalCompletedOrders >= 150 && firmStars >= 4) {
    newLevel = 3;
  } else if (totalCompletedOrders >= 50 && firmStars >= 4) {
    newLevel = 2;
  }

  // Yanıt sürelerini hesapla
  const messages = await prismadb.directMessage.findMany({
    where: {
      member: {
        profileId: receiverId,
      },
    },
    select: {
      createdAt: true,
    },
  });

  let totalResponseTime = 0;
  let responseCount = 0;

  for (let i = 1; i < messages.length; i++) {
    const responseTime =
      new Date(messages[i].createdAt).getTime() -
      new Date(messages[i - 1].createdAt).getTime();

    if (responseTime > 0) {
      totalResponseTime += responseTime;
      responseCount++;
    }
  }

  const averageResponseTime = totalResponseTime / responseCount || 0;

  // Yanıt süresini dakika cinsine çevir
  let responseRate = "";
  if (averageResponseTime < 60000) {
    responseRate = `${Math.round(averageResponseTime / 1000)} seconds`;
  } else if (averageResponseTime < 3600000) {
    responseRate = `${Math.round(averageResponseTime / 60000)} minutes`;
  } else if (averageResponseTime < 86400000) {
    responseRate = `${Math.round(averageResponseTime / 3600000)} hours`;
  } else if (averageResponseTime < 2592000000) {
    responseRate = `${Math.round(averageResponseTime / 86400000)} days`;
  } else if (averageResponseTime < 31536000000) {
    responseRate = `${Math.round(averageResponseTime / 2592000000)} months`;
  } else {
    responseRate = `${Math.round(averageResponseTime / 31536000000)} years`;
  }

  // Freelancer tablosunu güncelle
  await prismadb.firm.update({
    where: { id: firmId },
    data: {
      stars: String(firmStars.toFixed(2)),
      level: newLevel.toString(),
      responseRate,
    },
  });
};
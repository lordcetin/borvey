'use server'
import prismadb from '@/lib/prismadb';

export const updateGigLevel = async (firmId: string) => {
  // Gig'e ait tüm siparişleri ve yıldız ortalamasını al
  const gig = await prismadb.firm.findUnique({
    where: { id: firmId },
    include: {
      offers: {
        where: { status: 'success' }, // Tamamlanmış siparişler
      },
    },
  });

  if (!gig) {
    throw new Error("Gig not found");
  }

  // Tamamlanmış sipariş sayısı
  const completedOrders = gig.offers.length;

  // Yıldız ortalaması
  const averageStars = parseFloat(gig.stars) || 0;

  // Yeni seviye belirleme
  let newLevel = parseInt(gig.level) || 1;

  if (completedOrders >= 150 && averageStars >= 4) {
    newLevel = 3;
  } else if (completedOrders >= 50 && averageStars >= 4) {
    newLevel = 2;
  }

  // Eğer seviye değişmişse güncelle
  if (newLevel !== parseInt(gig.level)) {
    await prismadb.firm.update({
      where: { id: firmId },
      data: { level: newLevel.toString() },
    });
  }
};
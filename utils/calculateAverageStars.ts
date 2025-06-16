'use server'
import prismadb from '@/lib/prismadb';

export const calculateAverageStars = async (firmId: string) => {
  const comments = await prismadb.comments.findMany({
  where: { profileId:firmId },
  select: {
    speedRate: true,
    serviceRate: true,
    communicationRate: true,
  },
  });

  const totalStars = comments.reduce((acc, curr) => {
  const speed = parseFloat(curr.speedRate) || 0;
  const service = parseFloat(curr.serviceRate) || 0;
  const communication = parseFloat(curr.communicationRate) || 0;
  const average = (speed + service + communication) / 3;
  return acc + average;
  }, 0);

  const averageStars = totalStars / comments.length;

  // 1 ile 5 arasında bir değere yuvarlama
  const roundedStars = Math.min(Math.max(1, Math.round(averageStars * 10) / 10), 5);

  // Eğer sonuç tam sayıysa float formatında döndür
  return Number.isInteger(roundedStars) ? parseFloat(roundedStars.toFixed(2)) : roundedStars;
  };
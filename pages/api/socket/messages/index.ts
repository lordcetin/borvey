// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextApiResponseServerIo } from "@/types";
// import { NextApiRequest } from "next";
// import prismadb from '@/lib/prismadb'

// export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
//   if(req.method !== "POST"){
//     return res.status(405).json({error:"Method not allowed"})
//   }
//   try {

//     const { content, fileUrl } = req.body;
//     const { userId,serverId, channelId } = req.query;

//     const server = await prismadb.server.findFirst({
//       where:{
//         id:serverId as string,
//         members:{
//           some:{
//             profileId: userId as string
//           }
//         }
//       },
//       include:{
//         members: true
//       }
//     });

//     const channel = await prismadb.channel.findFirst({
//       where:{
//         id:channelId as string,
//         serverId: serverId as string
//       }
//     })

//     const member = server?.members.find((member:any) => member?.profileId === String(userId))

//     const message = await prismadb.message.create({
//       data:{
//         content,
//         fileUrl,
//         channelId: channel?.id as string,
//         memberId: member?.id as string,
//       },
//       include:{
//         member:{
//           include:{
//             profile:true
//           }
//         }
//       }
//     })

//     const channelKey = `chat:${channelId}:messages`;
//     res?.socket?.server?.io?.emit(channelKey,message)

//     return res.status(200).json(message)

//   } catch (error) {
//     console.error("[MESSAGES_POST]",error)
//     return res.status(500).json({message:"Internal Error"})
//   }
// }
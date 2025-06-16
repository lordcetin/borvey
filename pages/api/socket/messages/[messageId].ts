// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextApiResponseServerIo } from "@/types";
// import { NextApiRequest } from "next";
// import prismadb from '@/lib/prismadb'
// import { MemberRole } from "@prisma/client";

// export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
  
//   if(req.method !== "DELETE" && req.method !== "PATCH"){
//     return res.status(405).json({error:"Method not allowed"})
//   }
//   try {
   
//     const { messageId,serverId,channgelId,userId } = req.query;
//     const { content } = req.body;

//     const server = await prismadb.server.findFirst({
//       where:{
//         id: serverId as string,
//         members:{
//           some:{
//             profileId: userId as string
//           }
//         }
//       },
//       include:{
//         members:true
//       }
//     })

//     const channel = await prismadb.channel.findFirst({
//       where:{
//         id: channgelId as string,
//         serverId: serverId as string,
//       }
//     })

//     const member = server?.members.find((member:any) => member.profileId === userId);

//     let message = await prismadb.message.findFirst({
//       where:{
//         id: messageId as string,
//         channelId: channgelId as string,
//       },
//       include:{
//         member:{
//           include:{
//             profile:true
//           }
//         }
//       }
//     })

//     const isMessageOwner = message?.memberId === member?.id;
//     const isAdmin = member?.role === MemberRole.ADMIN;
//     const isModerator = member?.role === MemberRole.MODERATOR;

//     const canModify = isMessageOwner || isAdmin || isModerator;

//     if(req.method === "DELETE"){
//       message = await prismadb.message.update({
//         where:{
//           id: messageId as string,
//         },
//         data:{
//           fileUrl:null,
//           content: "This message has been deleted.",
//           deleted:true,
//         },
//         include:{
//           member:{
//             include:{
//               profile:true
//             }
//           }
//         }
//       })
//     }

//     if(req.method === "PATCH"){
//       message = await prismadb.message.update({
//         where:{
//           id: messageId as string,
//         },
//         data:{
//           content,
//         },
//         include:{
//           member:{
//             include:{
//               profile:true
//             }
//           }
//         }
//       })
//     }

//     const updateKey = `chat:${channgelId}:messages:update`;

//     res?.socket?.server?.io?.emit(updateKey, message)

//     return res.status(200).json(message)

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({error:"Internal Error"})
//   }

// }
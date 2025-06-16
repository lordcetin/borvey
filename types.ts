/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Server as NetServer,Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

//@ts-ignore
import { Server, User, Member } from '@prisma/client';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & {profile: User})[];
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
    grecaptcha:any;
  }
}
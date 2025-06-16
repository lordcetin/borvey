/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import React from 'react'
import RegisterClient from './_components/RegisterClient'

type Props = {}

const Register = async (props: Props) => {

  return (
    <>
    <RegisterClient />
    </>
  )
}

export default Register
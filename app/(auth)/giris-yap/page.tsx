/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import InputThird from '@/components/Input/InputThird'
import Logo from '@/components/Logo/page'
import { findEmail } from '@/utils/emailToEmail'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import InputSMSOTP from '@/components/Input/InputSMSOTP'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { firebaseConfig } from '@/utils/firebase'
import { useTheme } from 'next-themes'
import Head from 'next/head'

interface FormData {
  email: string
  password: string
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Giriş Yap',
  url: 'https://borvey.com/login',
  description: 'Borvey hesabınıza giriş yapın ve nakliye hizmetlerine ulaşın.',
};

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [isPhone, setIsPhone] = useState(true)
  const [component, setComponent] = useState<'input-number' | 'input-otp'>('input-number')
  const [otpVal, setOTPValue] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)
  const confirmationResultRef = useRef<any>(null)
  const year = new Date().getFullYear()
  const { resolvedTheme } = useTheme()

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  // // Initialize App Check
  // useEffect(() => {
  //   const appCheck = initializeAppCheck(app, {
  //     provider: new ReCaptchaV3Provider('6LfKk1srAAAAACL2qJJtR13r9VFKxTS5YNTOUZ-I'),
  //     isTokenAutoRefreshEnabled: true,
  //   })
  //   return () => {
  //     //@ts-ignore
  //     appCheck?.tokenObserver?.unsubscribe?.()
  //   }
  // }, [])

  // Initialize Recaptcha
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load reCAPTCHA script
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.onload = () => {
        console.log('reCAPTCHA script yüklendi');
        // Initialize App Check after script is loaded
        const appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider('AIzaSyAOTdQMFGP6LiOk5QDPBdQSK5zJ8rJvQPs'),
          isTokenAutoRefreshEnabled: true,
        });

        // Initialize RecaptchaVerifier
        auth.languageCode = 'tr';
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          theme:resolvedTheme,
          callback: () => {
            console.log('reCAPTCHA doğrulandı');
          },
          'expired-callback': () => {
            setError('reCAPTCHA süresi doldu. Lütfen tekrar deneyin.');
          },
        });

        // Ensure grecaptcha is ready
        window.grecaptcha?.ready(() => {
          recaptchaVerifierRef.current?.render().then(() => {
            console.log('reCAPTCHA yüklendi ve render edildi');
          }).catch((error) => {
            console.error('reCAPTCHA render hatası:', error);
            setError('reCAPTCHA yüklenemedi');
          });
        });
      };
      script.onerror = () => {
        console.error('reCAPTCHA script yüklenemedi');
        setError('reCAPTCHA yüklenemedi');
      };
      document.head.appendChild(script);

      return () => {
        recaptchaVerifierRef.current?.clear();
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [auth]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const findMail = await findEmail(email)
      await signIn('credentials', {
        redirectTo: findMail?.isAdmin === 'admin' ? '/admin' : '/panel/teklifler',
        email: findMail?.email || email,
        password,
      })
      formRef.current?.reset()
    } catch (err:any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async () => {
    if (!phone || !recaptchaVerifierRef.current) return

    setLoading(true)
    setError(null)

    try {
      const formattedPhone = `+${phone}`
      console.log("formattedPhone",formattedPhone)
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      )
      confirmationResultRef.current = confirmationResult
      setComponent('input-otp')
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otpVal || !confirmationResultRef.current) return

    setLoading(true)
    setError(null)

    try {
      const result = await confirmationResultRef.current.confirm(otpVal)
      const idToken = await result.user.getIdToken()
      
      await signIn('firebase', {
        idToken,
        phone:`+${phone}`,
        redirectTo: '/panel/teklifler',
      })
    } catch (error: any) {
      setError(error.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
    <div className="flex items-center w-full max-md:w-screen max-md:h-screen max-md:overflow-hidden p-10 max-md:p-5 gap-x-8 dark:bg-[#0a0d11] bg-[#deebf8]">
      <div className="flex justify-center items-center w-full dark:bg-[#13171b] p-20 max-md:p-7 bg-white rounded-3xl h-[calc(100vh-75px)] max-md:h-auto max-md:py-10 relative border dark:border-white/5 border-black/15">
        <div className="absolute top-5 left-7 outline-none">
          <Logo />
        </div>
        <div className="flex-col flex items-center w-full justify-center p-20 max-md:px-7">
          <div className="flex-col flex justify-center items-center w-full space-y-2">
            <h1 className="text-4xl font-bold">Giriş Yap</h1>
            <div className="flex items-center gap-x-1 text-xl max-md:text-base">
              Hesabın yok mu?{' '}
              <Link title='Kayıt Ol' href="/kayit-ol" className="text-amber-500 font-semibold hover:underline transition-all">
                Kayıt Ol
              </Link>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            {isPhone ? (
              <div className="flex-col items-center space-y-4 w-[60%] max-md:w-full mt-10">
                {component === 'input-number' ? (
                  <div className="relative w-full overflow-hidden border dark:border-white/30 border-black/30 pl-3 rounded-lg">
                    <PhoneInput
                      onlyCountries={['tr']}
                      localization={{ tr: 'Turkish' }}
                      defaultMask="... ... ... ... .."
                      country={'tr'}
                      value={phone}
                      onChange={setPhone}
                      buttonClass="!dark:bg-black/20 bg-black/20 !rounded-l-lg !border !border-slate-400 !outline-none hidden"
                      dropdownClass="dark:bg-black/20 bg-black/20 !text-slate-500 hidden"
                    />
                  </div>
                ) : (
                  <InputSMSOTP phone={phone} confirmationResultRef={confirmationResultRef} setOTPValue={setOTPValue} otpVal={otpVal} />
                )}
                <div className='flex justify-center items-center'><div id="recaptcha-container" /></div>
                {component === 'input-number' && 
                <button
                  type="button"
                  onClick={component === 'input-number' ? sendOtp : verifyOtp}
                  disabled={loading}
                  className="w-full p-5 bg-amber-500 hover:bg-amber-600 transition-all block mt-5 rounded-xl text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Yükleniyor...' : component === 'input-number' ? 'Kod Gönder' : 'Kodu Doğrula'}
                </button>}
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleLogin} className="flex-col items-center space-y-4 w-[60%] max-md:w-full mt-10">
                <InputThird
                  label="E-mail"
                  required
                  id="email"
                  name="email"
                  type="text"
                  onError={!!error}
                  value={(e: any) => e.target.value}
                  errorMessage={error || ''}
                />
                <InputThird
                  required
                  label="Şifre"
                  id="password"
                  name="password"
                  type="password"
                  onError={!!error}
                  value={(e: any) => e.target.value}
                  errorMessage={error || ''}
                />
                <Link title='Şifre Yenile' href="/sifre-yenile" className="text-blue-500 hover:underline">
                  Şifreni mi unuttun?
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-5 bg-amber-500 hover:bg-amber-600 transition-all block mt-5 rounded-xl text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Yükleniyor...' : 'Giriş Yap'}
                </button>
              </form>
            )}
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={() => setIsPhone(!isPhone)}
                type="button"
                className="hover:underline cursor-pointer"
              >
                {isPhone ? 'E-mail ile devam et' : 'Telefon ile devam et'}
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-sm dark:text-white/30 text-black/70 flex justify-center items-center w-full absolute bottom-5 gap-x-1">
          © {year} <strong>borvey</strong> TÜM HAKLARI SAKLIDIR
        </h1>
      </div>
      <div className="h-[calc(100vh-75px)] w-[30%] object-cover rounded-3xl shrink-0 box-border max-md:hidden block max-md:h-fit">
        <Image
          src="/assets/login-image.png"
          width={800}
          height={800}
          alt=""
          className="h-[calc(100vh-75px)] w-[40vw] object-cover rounded-3xl max-md:hidden"
        />
      </div>
    </div>
    </>
  )
}

export default Login
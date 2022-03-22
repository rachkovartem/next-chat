import {useEffect, useState} from "react";
import ApiServices from "../../services/ApiServices";
import {useRouter} from "next/router";
import {Button, TextField} from "@mui/material";
import {useTranslation} from "next-i18next";
import {ChangeLocal} from "../changeLocal/ChangeLocal";


const Login = ({locale} : {locale: string}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [loginError, setLoginError] = useState(false)
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [onRegistration, setOnRegistration] = useState(false);
    const { login, register, check } = ApiServices();

    const onLoading = async () => {
        const res = await check()
        if (res.status === 403) return
        if (res.status >= 200 || res.status < 300) {
            router.push(`/profile/${res.data.id}`);
        }
    }

    useEffect(() => {
        onLoading()
    }, [])

    const onInputEmail = (e: any) => {
        setLoginError(false);
        setError(false);
        setEmail(e.target.value);
        setValid(e.target.validity.valid);
    }

    const onInputPassword = (e: any) => {
        setLoginError(false);
        setError(false);
        setPassword(e.target.value);
        setValid(e.target.validity.valid);
    }

    const onInputUsername = (e: any) => {
      setUsername(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
    }

    const onClickLogin = async () => {
        if (!valid) {
            setError(true);
            return
        }
        if (!password) {
            setLoginError(true);
            setError(true);
            return
        }
        const res = await login(email, password);
        const resBody = res.data;
        console.log(resBody)
        if ('id' in resBody) {
            localStorage.setItem('email', resBody.email);
            localStorage.setItem('id', resBody.id);
            localStorage.setItem('username', resBody.username);
            setLoginError(false);
            router.push(`/profile/${resBody.id}`);
        } else {
            setLoginError(true);
            localStorage.clear();
        }
    }

    const onClickRegister = async (e: any) => {
            if (!onRegistration) {
              setOnRegistration(true)
              return
            }
            setLoginError(false);
            if (!password || !email || !password) {
              setError(true);
              return
            }
            const res = await register(email, password, username);
            if (res.status === 'successfully') {
                await onClickLogin();
                setEmail('');
                setPassword('');
                setUsername('');
            } else if (res.status === 'already exist') {
                setError(true)
            }
    }

    const errorVisibility = error || loginError ? 'visible' : 'hidden';
    const displayOnRegistration = onRegistration ? 'inline-flex' : 'none';

    return (
      <>
        <ChangeLocal locale={locale}/>
        <form onSubmit={onSubmit} style={{width: '30%', margin: '0 auto'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px 0'}}>
            <TextField
              required
              id="outlined-required-email"
              label={t('email')}
              placeholder={t('email')}
              value={email}
              onInput={onInputEmail}
              type="email"
              error={error || loginError}
            />
            <TextField
              sx={{display: displayOnRegistration}}
              required={onRegistration}
              id="outlined-required-username"
              label={t('username')}
              placeholder={t('username')}
              value={username}
              onInput={onInputUsername}
              type="text"
              error={error || loginError}
            />
            <TextField
              required
              id="outlined-required-password"
              label={t('password')}
              placeholder={t('password')}
              value={password}
              onInput={onInputPassword}
              type="password"
              error={error || loginError}
            />
          </div>
          <Button
            sx={{margin: '0 auto', background: '#a8edea', color: '#3b3b3b'}}
            onClick={onClickLogin}
            variant="contained"
          >
              {t('login')}
          </Button>
          <span
            style={{color: '#5d5d5d', padding: '0 10px'}}
          >
              {t('or')}
          </span>
          <Button
            sx={{margin: '0 auto', background: '#a8edea', color: '#3b3b3b'}}
            onClick={onClickRegister}
            variant="contained"
          >
              {t('register')}
          </Button>
          <p
            style={{color: 'red', visibility: errorVisibility}}
          >
              {
                  loginError
                    ? t('userDoesNotExist')
                    : t('userAlreadyExist')
              }
          </p>
        </form>
      </>

    )
}

export default Login
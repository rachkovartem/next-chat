import Login from "./components/login/Login";
import {useEffect} from "react";
import {router} from "next/client";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Index = (props: any) => {
    return (<Login {...props}/>)
}

export async function getStaticProps(context: any) {
    const { locale } = context;
    return {
        props: {
            locale,
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}

export default Index
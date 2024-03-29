import React from "react";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function withTestRouter(
  tree: React.ReactElement,
  router: Partial<NextRouter> = {}
) {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  } = router;

  return (
    <RouterContext.Provider
      // @ts-ignore
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events,
      }}
    >
      {tree}
    </RouterContext.Provider>
  );
}

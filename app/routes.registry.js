import { AppContainerLayout } from "@wrappid/core"

export const RoutesRegistry = {
  WebScrapper: {
    Page        : { appComponent: "WebScrapper", layout: AppContainerLayout.name },
    authRequired: true,
    entityRef   : "webscrapper",
    url         : "webscrapper"
  },
};
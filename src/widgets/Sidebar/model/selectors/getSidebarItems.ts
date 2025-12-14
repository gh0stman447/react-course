import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import ArticleIcon from "shared/assets/icons/article.svg";
import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userAuthData) => {
  const SidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: "Главная",
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: "О сайте",
    },
  ];

  if (userAuthData) {
    SidebarItemsList.push(
      {
        path: `${RoutePath.profile}${userAuthData.id}`,
        Icon: ProfileIcon,
        text: "Профиль",
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: "Статьи",
        authOnly: true,
      },
    );
  }

  return SidebarItemsList;
});

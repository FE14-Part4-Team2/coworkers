import { queryOptions } from "@tanstack/react-query";
import { userService } from "./user.service";

const userQuery = {
  all: ["user"],
  myInfoKey: () => [...userQuery.all, "myInfo"],
  myInfo: () =>
    queryOptions({
      queryKey: userQuery.myInfoKey(),
      queryFn: () => userService.getMyInfo(),
    }),
  myGroupsKey: () => [...userQuery.all, "myGroups"],
  myGroups: () =>
    queryOptions({
      queryKey: userQuery.myGroupsKey(),
      queryFn: () => userService.getMyGroups(),
    }),
  myMembershipsKey: () => [...userQuery.all, "myMemberships"],
  myMemberships: () =>
    queryOptions({
      queryKey: userQuery.myMembershipsKey(),
      queryFn: () => userService.getMyMemberships(),
    }),
  myHistoryKey: () => [...userQuery.all, "myHistory"],
  MyHistory: () =>
    queryOptions({
      queryKey: userQuery.myHistoryKey(),
      queryFn: () => userService.getMyHistory(),
    }),
};
